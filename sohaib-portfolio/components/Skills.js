'use client'
import { useState } from 'react'

export default function Skills({ skills }) {
  const [hovered, setHovered] = useState(null)

  const colorMap = {
    '#7C3AED': 'rgba(124, 58, 237, 0.15)',
    '#00F5FF': 'rgba(0, 245, 255, 0.15)',
    '#FFB700': 'rgba(255, 183, 0, 0.15)',
    '#F472B6': 'rgba(244, 114, 182, 0.15)',
    '#4ade80': 'rgba(74, 222, 128, 0.15)',
    '#FB923C': 'rgba(251, 146, 60, 0.15)',
  }

  return (
    <section id="skills" className="py-32 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0, 245, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-3">// What I Build With</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ghost">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(232,232,240,0.5)' }}>
            A production-ready toolkit spanning agentic systems, ML engineering, deep learning, and AI automation — everything needed to build intelligent products that scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(skills || []).map((skill, i) => {
            const isHovered = hovered === i
            const bg = colorMap[skill.color] || 'rgba(124, 58, 237, 0.1)'

            return (
              <div
                key={i}
                className="rounded-2xl p-6 cursor-default transition-all duration-300"
                style={{
                  background: isHovered ? bg : 'rgba(13, 13, 26, 0.6)',
                  border: `1px solid ${isHovered ? skill.color + '60' : 'rgba(124, 58, 237, 0.15)'}`,
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? `0 20px 40px ${skill.color}20, 0 0 20px ${skill.color}15` : 'none',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: bg || 'rgba(124, 58, 237, 0.15)',
                      border: `1px solid ${skill.color}40`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ghost text-sm">
                      {skill.category}
                    </h3>
                    <p className="text-xs font-mono mt-0.5" style={{ color: skill.color, opacity: 0.8 }}>
                      {skill.items.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skill items */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-xs font-mono px-2.5 py-1 rounded-md transition-all duration-200"
                      style={{
                        background: isHovered ? `${skill.color}20` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isHovered ? skill.color + '40' : 'rgba(255,255,255,0.08)'}`,
                        color: isHovered ? skill.color : 'rgba(232,232,240,0.6)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Bottom accent bar */}
                <div className="mt-5 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: isHovered ? '100%' : '40%',
                      background: `linear-gradient(90deg, ${skill.color}, transparent)`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(0, 245, 255, 0.04) 100%)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
          }}
        >
          <p className="font-display font-semibold text-xl text-ghost mb-2">
            Always learning, always building.
          </p>
          <p className="text-sm font-mono" style={{ color: 'rgba(232,232,240,0.4)' }}>
            Currently exploring: Google ADK 2.0 · Constitutional AI · Multimodal Agents · LLM Fine-tuning
          </p>
        </div>
      </div>
    </section>
  )
}
