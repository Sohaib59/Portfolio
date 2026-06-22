'use client'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { getProfile, getProjects, getSkills } from '../lib/storage'

export default function Home() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
    setProjects(getProjects())
    setSkills(getSkills())
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#050508' }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #00F5FF)',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.3)' }}>
            Initializing neural network...
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#050508' }}>
      <Nav />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact profile={profile} />
      <Footer />
    </main>
  )
}
