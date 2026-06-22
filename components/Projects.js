'use client'
import { useState } from 'react'

const categoryColors = {
  'ML Engineering': { color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.15)' },
  'Agentic AI': { color: '#00F5FF', bg: 'rgba(0, 245, 255, 0.12)' },
  'AI Applications': { color: '#FFB700', bg: 'rgba(255, 183, 0, 0.12)' },
  'Deep Learning': { color: '#F472B6', bg: 'rgba(244, 114, 182, 0.12)' },
  'AI Automation': { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
}

const statusStyles = {
  Production: { color: '#4ade80', label: '◉ Production' },
  Hackathon: { color: '#FFB700', label: '◎ Hackathon' },
  Experimental: { color: '#00F5FF', label: '◌ Experimental' },
  'In Progress': { color: '#9D5CF2', label: '◑ In Progress' },
}

function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useState(null)

  const catStyle = categoryColors[project.category] || { color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.12)' }
  const statusStyle = statusStyles[project.status] || statusStyles['Experimental']

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * -12
    const tiltY = (x - 0.5) * 12
    setTilt({ x: tiltX, y: tiltY })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(135deg, rgba(13, 13, 26, 0.9) 0%, rgba(30, 30, 58, 0.6) 100%)',
        border: `1px solid rgba(124, 58, 237, 0.2)`,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: tilt.x !== 0
          ? `0 25px 50px rgba(0,0,0,0.5), 0 0 30px ${catStyle.color}20`
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 z-20 text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: 'rgba(255, 183, 0, 0.15)', border: '1px solid rgba(255, 183, 0, 0.4)', color: '#FFB700' }}
        >
          ★ Featured
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Category + Status */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-md"
            style={{ background: catStyle.bg, border: `1px solid ${catStyle.color}30`, color: catStyle.color }}
          >
            {project.category}
          </span>
          <span className="text-xs font-mono" style={{ color: statusStyle.color }}>
            {statusStyle.label}
          </span>
        </div>

        {/* Title */}
        <div className="mb-3">
          <h3 className="text-xl font-display font-bold text-ghost group-hover:text-white transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm font-mono mt-0.5" style={{ color: catStyle.color, opacity: 0.8 }}>
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'rgba(232,232,240,0.55)' }}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map((m, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: 'rgba(0, 245, 255, 0.08)', border: '1px solid rgba(0, 245, 255, 0.2)', color: '#67E8F9' }}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {(project.tags || []).slice(0, 5).map((tag, i) => (
            <span key={i} className="tech-tag text-xs">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(124, 58, 237, 0.1)' }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
              style={{ color: 'rgba(232,232,240,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8E8F0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,232,240,0.5)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono"
              style={{ color: '#00F5FF' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ projects }) {
  const categories = ['All', ...new Set((projects || []).map(p => p.category))]
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? (projects || [])
    : (projects || []).filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="py-32 relative">
      {/* Bg accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 20% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="section-label mb-3">// What I've Built</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ghost">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(232,232,240,0.5)' }}>
            End-to-end AI systems, from multi-agent orchestration to production ML pipelines — each built to solve real problems with measurable impact.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => {
            const catStyle = categoryColors[cat] || { color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.15)' }
            const isActive = activeFilter === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="text-xs font-mono px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: isActive ? (cat === 'All' ? 'rgba(124,58,237,0.3)' : catStyle.bg) : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? (cat === 'All' ? 'rgba(124,58,237,0.6)' : catStyle.color + '60') : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? (cat === 'All' ? '#9D5CF2' : catStyle.color) : 'rgba(232,232,240,0.4)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id || i} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ghost/30 font-mono text-sm">No projects found in this category</p>
          </div>
        )}

        {/* View more */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/sohaib"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            See All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
