'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const NeuralNetwork3D = dynamic(() => import('./NeuralNetwork3D'), { ssr: false })

const TYPED_STRINGS = [
  'Agentic AI Systems',
  'Multi-Agent Orchestration',
  'ML Engineering',
  'LangGraph Pipelines',
  'AI Automation',
  'Deep Learning Models',
]

function TypeWriter({ strings, speed = 80, pause = 1800 }) {
  const [text, setText] = useState('')
  const [strIdx, setStrIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[strIdx]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      }, speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setStrIdx(i => (i + 1) % strings.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, strIdx, strings, speed, pause])

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse" style={{ color: '#00F5FF' }}>|</span>
    </span>
  )
}

export default function Hero({ profile }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        {mounted && <NeuralNetwork3D />}
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050508)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: 'rgba(0, 245, 255, 0.08)',
            border: '1px solid rgba(0, 245, 255, 0.25)',
          }}
        >
          <span className="status-live text-xs font-mono">Available for hire</span>
          <span className="text-ghost/40 text-xs font-mono">·</span>
          <span className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.5)' }}>
            {profile?.location || 'Bahawalpur, Pakistan'}
          </span>
        </div>

        {/* Main heading */}
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl mb-6 text-ghost">
          Building the Future<br />
          <span className="block mt-2">with </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl mt-1 h-16 md:h-24">
            {mounted && <TypeWriter strings={TYPED_STRINGS} />}
          </span>
        </h1>

        {/* Sub-heading */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(232,232,240,0.6)' }}
        >
          {profile?.bio?.slice(0, 160) || 'AI/ML Engineer architecting multi-agent systems, production ML pipelines, and intelligent automation workflows that deliver real-world impact.'}...
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
          <button onClick={scrollToProjects} className="btn-primary text-sm px-8 py-3">
            View Projects →
          </button>
          <button onClick={scrollToContact} className="btn-secondary text-sm px-8 py-3">
            Let's Talk
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {(profile?.stats || [
            { value: '20+', label: 'Projects Built' },
            { value: '6+', label: 'Hackathons' },
            { value: '15+', label: 'ML Models' },
            { value: '30+', label: 'Automations' },
          ]).map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-display font-bold"
                style={{ color: i % 2 === 0 ? '#7C3AED' : '#00F5FF' }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-mono mt-1" style={{ color: 'rgba(232,232,240,0.4)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.3)' }}>scroll</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(124, 58, 237, 0.2)' }}>
          <div
            className="absolute top-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, transparent, #7C3AED)',
              animation: 'scan 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
