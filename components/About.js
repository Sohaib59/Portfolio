'use client'

export default function About({ profile }) {
  const highlights = [
    { icon: '🎓', label: 'Education', value: 'CS @ IUB Bahawalpur, 5th Semester' },
    { icon: '💼', label: 'Current Role', value: 'AI/ML Intern @ Hexovate Solutions' },
    { icon: '🏆', label: 'Achievements', value: '6+ Hackathons, 20+ AI Projects' },
    { icon: '🌍', label: 'Focus', value: 'Pakistan-first AI with Global Scale' },
  ]

  const techIcons = ['Python', 'LangGraph', 'FastAPI', 'n8n', 'ChromaDB', 'Docker', 'PyTorch', 'XGBoost']

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-3">// Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ghost">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bio */}
          <div>
            {/* Terminal-style card */}
            <div className="glass-card rounded-2xl overflow-hidden mb-8">
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.15)', background: 'rgba(0,0,0,0.3)' }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs font-mono" style={{ color: 'rgba(232,232,240,0.4)' }}>
                  sohaib@portfolio ~ profile.json
                </span>
              </div>

              <div className="p-6">
                <pre className="text-xs font-mono leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)', whiteSpace: 'pre-wrap' }}>
{`{
  "name": "${profile?.name || 'Sohaib'}",
  "role": "AI/ML Engineer",
  "personality": "INTJ",
  "mission": "Build category-defining AI",
  "stack": ["LangGraph", "FastAPI", "PyTorch"],
  "currently": "Hexovate AI/ML Intern",
  "goal": "Entrepreneurship + Financial Freedom",
  "location": "${profile?.location || 'Bahawalpur, Pakistan'}"
}`}
                </pre>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(232,232,240,0.65)' }}>
              {profile?.bio || 'AI/ML Engineer and self-taught practitioner building intelligent systems that make a real difference. From multi-agent LangGraph platforms to production ML pipelines with SHAP explainability — I architect end-to-end AI solutions that scale.'}
            </p>

            <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.5)' }}>
              As an INTJ, I approach every problem with systems thinking — seeing patterns, optimizing pipelines, and building with long-term architectural clarity. My goal: build a category-defining AI company from Pakistan to the world.
            </p>
          </div>

          {/* Right: Highlights + Tech */}
          <div className="space-y-6">
            {/* Highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="glass-card rounded-xl p-5">
                  <div className="text-2xl mb-2">{h.icon}</div>
                  <div className="text-xs font-mono mb-1" style={{ color: '#00F5FF', opacity: 0.7 }}>
                    {h.label}
                  </div>
                  <div className="text-sm font-display font-medium text-ghost/80">
                    {h.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="glass-card rounded-xl p-6">
              <p className="section-label mb-4">// Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {techIcons.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Currently */}
            <div
              className="rounded-xl p-5 flex items-start gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(0, 245, 255, 0.06) 100%)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite' }}
              />
              <div>
                <p className="text-sm font-display font-semibold text-ghost mb-1">
                  {profile?.availability || 'Open to Freelance & Full-Time Opportunities'}
                </p>
                <p className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.4)' }}>
                  Specializing in Agentic AI · ML Engineering · AI Automation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
