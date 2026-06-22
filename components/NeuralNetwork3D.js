'use client'
import { useEffect, useRef } from 'react'

export default function NeuralNetwork3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    let animId
    let THREE

    const init = async () => {
      THREE = await import('three')
      const mount = mountRef.current
      if (!mount) return

      // ── Scene ──────────────────────────────────────────
      const scene = new THREE.Scene()
      const W = mount.clientWidth
      const H = mount.clientHeight
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000)
      camera.position.set(0, 0, 80)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // ── Particles (background stars) ─────────────────
      const starCount = 300
      const starGeo = new THREE.BufferGeometry()
      const starPos = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 400
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
      const starMat = new THREE.PointsMaterial({ color: 0x9D5CF2, size: 0.4, transparent: true, opacity: 0.5 })
      scene.add(new THREE.Points(starGeo, starMat))

      // ── Neural Nodes ──────────────────────────────────
      const NODE_COUNT = 60
      const nodes = []
      const nodeGroup = new THREE.Group()
      scene.add(nodeGroup)

      const sphereGeo = new THREE.SphereGeometry(0.4, 8, 8)

      for (let i = 0; i < NODE_COUNT; i++) {
        const isPrimary = i < 20
        const color = isPrimary ? 0x7C3AED : i < 40 ? 0x00F5FF : 0xFFB700
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 })
        const mesh = new THREE.Mesh(sphereGeo, mat)

        const r = 30 + Math.random() * 40
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        mesh.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi) - 30
        )

        mesh.userData = {
          basePos: mesh.position.clone(),
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.02
          ),
          phase: Math.random() * Math.PI * 2,
          color,
        }
        nodeGroup.add(mesh)
        nodes.push(mesh)
      }

      // ── Edges ─────────────────────────────────────────
      const MAX_DIST = 28
      const edgeGroup = new THREE.Group()
      scene.add(edgeGroup)
      const edgeLines = []

      function rebuildEdges() {
        edgeLines.forEach(l => edgeGroup.remove(l))
        edgeLines.length = 0

        for (let i = 0; i < nodes.length; i++) {
          let connections = 0
          for (let j = i + 1; j < nodes.length; j++) {
            if (connections >= 3) break
            const d = nodes[i].position.distanceTo(nodes[j].position)
            if (d < MAX_DIST) {
              const opacity = (1 - d / MAX_DIST) * 0.4
              const pts = [nodes[i].position.clone(), nodes[j].position.clone()]
              const geo = new THREE.BufferGeometry().setFromPoints(pts)
              const mat = new THREE.LineBasicMaterial({
                color: 0x7C3AED,
                transparent: true,
                opacity,
              })
              const line = new THREE.Line(geo, mat)
              edgeGroup.add(line)
              edgeLines.push(line)
              connections++
            }
          }
        }
      }

      rebuildEdges()

      // ── Central Sphere (brain core) ───────────────────
      const coreGeo = new THREE.SphereGeometry(5, 32, 32)
      const wireGeo = new THREE.WireframeGeometry(coreGeo)
      const wireMat = new THREE.LineBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.15 })
      const coreMesh = new THREE.LineSegments(wireGeo, wireMat)
      scene.add(coreMesh)

      const innerGeo = new THREE.SphereGeometry(3, 16, 16)
      const innerMat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.12 })
      scene.add(new THREE.Mesh(innerGeo, innerMat))

      // ── Ring ──────────────────────────────────────────
      const ringGeo = new THREE.TorusGeometry(12, 0.05, 8, 120)
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.25 })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 4
      scene.add(ring)

      // ── Mouse tracking ────────────────────────────────
      let mx = 0, my = 0
      const onMouseMove = (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2
        my = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── Animation ────────────────────────────────────
      let frame = 0
      const clock = new THREE.Clock()

      const animate = () => {
        animId = requestAnimationFrame(animate)
        frame++
        const t = clock.getElapsedTime()

        // Animate nodes
        nodes.forEach(node => {
          const { vel, phase } = node.userData
          node.position.add(vel)

          // Soft boundary reset
          if (node.position.length() > 75) {
            node.position.multiplyScalar(0.99)
            node.userData.vel.multiplyScalar(-0.5)
          }

          // Pulse scale
          const s = 1 + Math.sin(t * 1.5 + phase) * 0.4
          node.scale.setScalar(s)
          node.material.opacity = 0.5 + Math.sin(t + phase) * 0.3
        })

        // Rebuild edges every 8 frames
        if (frame % 8 === 0) rebuildEdges()

        // Rotate core
        coreMesh.rotation.y = t * 0.2
        coreMesh.rotation.x = t * 0.1

        // Rotate ring
        ring.rotation.z = t * 0.1

        // Camera mouse follow
        camera.position.x += (mx * 8 - camera.position.x) * 0.04
        camera.position.y += (my * 8 - camera.position.y) * 0.04
        camera.lookAt(0, 0, 0)

        // Slow node group rotation
        nodeGroup.rotation.y = t * 0.05

        renderer.render(scene, camera)
      }

      animate()

      // ── Resize ────────────────────────────────────────
      const onResize = () => {
        if (!mount) return
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }

    let cleanup
    init().then(fn => { cleanup = fn })

    return () => {
      if (cleanup) cleanup()
      else cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
