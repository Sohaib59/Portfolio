'use client'
import { useState } from 'react'

export default function Contact({ profile }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', subject: '' })
  const [sent, setSent] = useState(false)

  const socials = [
    {
      label: 'Email',
      value: profile?.email || 'sohaib@example.com',
      href: `mailto:${profile?.email || 'sohaib@example.com'}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      color: '#7C3AED',
    },
    {
      label: 'GitHub',
      value: 'sohaib',
      href: profile?.github || 'https://github.com/sohaib',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: '#00F5FF',
    },
    {
      label: 'LinkedIn',
      value: 'sohaib-ai',
      href: profile?.linkedin || 'https://linkedin.com/in/sohaib',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      color: '#FFB700',
    },
    {
      label: 'Kaggle',
      value: 'sohaib',
      href: profile?.kaggle || 'https://kaggle.com/sohaib',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.234.118-.353.354-.353h2.431c.234 0 .351.119.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336"/>
        </svg>
      ),
      color: '#4ade80',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, integrate with Formspree, EmailJS, or any email service
    const mailtoLink = `mailto:${profile?.email || 'sohaib@example.com'}?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`
    window.open(mailtoLink)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setFormState({ name: '', email: '', message: '', subject: '' })
  }

  return (
    <section id="contact" className="py-32 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="section-label mb-3">// Let's Build Together</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ghost">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: 'rgba(232,232,240,0.5)' }}>
            Open to freelance projects, full-time roles, hackathon collabs, and conversations about the future of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Social links */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-5 flex items-center gap-4 no-underline group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}20`, border: `1px solid ${s.color}30`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: s.color, opacity: 0.8 }}>{s.label}</p>
                    <p className="text-sm font-display font-medium text-ghost/70 group-hover:text-ghost transition-colors">
                      {s.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* What I'm looking for */}
            <div
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(0, 245, 255, 0.05) 100%)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
              }}
            >
              <p className="section-label mb-4">// I'm interested in</p>
              {[
                'Agentic AI system architecture & consulting',
                'ML engineering & production deployment',
                'AI automation for businesses',
                'Co-founding AI startups',
                'Technical AI/ML roles',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 4 ? '1px solid rgba(124,58,237,0.1)' : 'none' }}>
                  <span style={{ color: '#00F5FF', fontSize: '10px' }}>◆</span>
                  <span className="text-sm font-mono" style={{ color: 'rgba(232,232,240,0.6)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="font-display font-semibold text-ghost text-lg mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(232,232,240,0.4)' }}>Name</label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(232,232,240,0.4)' }}>Email</label>
                    <input
                      type="email"
                      required
                      className="input-field"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(232,232,240,0.4)' }}>Subject</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Project inquiry, collaboration..."
                    value={formState.subject}
                    onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(232,232,240,0.4)' }}>Message</label>
                  <textarea
                    required
                    rows={5}
                    className="input-field"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-sm"
                  style={{ opacity: sent ? 0.7 : 1 }}
                >
                  {sent ? '✓ Message Sent! Check your email client' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
