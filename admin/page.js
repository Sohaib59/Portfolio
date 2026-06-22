'use client'
import { useState, useEffect } from 'react'
import {
  getProfile, saveProfile,
  getProjects, addProject, updateProject, deleteProject,
  getSkills, saveSkills,
  resetToDefaults,
  DEFAULT_PROJECTS,
} from '../../lib/storage'

// ── Helpers ──────────────────────────────────────────────────────────────
const CATEGORIES = ['ML Engineering', 'Agentic AI', 'AI Applications', 'Deep Learning', 'AI Automation']
const STATUSES = ['Production', 'Hackathon', 'In Progress', 'Experimental']

const emptyProject = {
  title: '', subtitle: '', description: '', tags: '',
  category: 'ML Engineering', status: 'Production',
  github: '', demo: '', featured: false,
  metrics: '',
}

// ── Mini components ───────────────────────────────────────────────────────
function Badge({ children, color = '#7C3AED' }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded"
      style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
    >
      {children}
    </span>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-display font-bold text-ghost">{title}</h2>
      {subtitle && <p className="text-xs font-mono mt-1" style={{ color: 'rgba(232,232,240,0.4)' }}>{subtitle}</p>}
    </div>
  )
}

// ── Project Form ──────────────────────────────────────────────────────────
function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyProject)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const project = {
      ...form,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
      metrics: typeof form.metrics === 'string' ? form.metrics.split(',').map(m => m.trim()).filter(Boolean) : form.metrics,
    }
    onSave(project)
  }

  const tagsStr = Array.isArray(form.tags) ? form.tags.join(', ') : form.tags
  const metricsStr = Array.isArray(form.metrics) ? form.metrics.join(', ') : form.metrics

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Project Title *</label>
          <input required className="input-field" placeholder="e.g. ORACLE" value={form.title} onChange={e => set('title', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Subtitle *</label>
          <input required className="input-field" placeholder="e.g. Demand Forecasting Engine" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Description *</label>
        <textarea required rows={3} className="input-field" placeholder="What does this project do? What problems does it solve?" value={form.description} onChange={e => set('description', e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Category</label>
          <select className="input-field" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Status</label>
          <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>
          Tech Tags <span style={{ color: 'rgba(232,232,240,0.3)' }}>(comma separated)</span>
        </label>
        <input className="input-field" placeholder="LangGraph, FastAPI, PyTorch, XGBoost..." value={tagsStr} onChange={e => set('tags', e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>
          Key Metrics <span style={{ color: 'rgba(232,232,240,0.3)' }}>(comma separated)</span>
        </label>
        <input className="input-field" placeholder="94% Accuracy, Real-time API, SHAP Explainability..." value={metricsStr} onChange={e => set('metrics', e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>GitHub URL</label>
          <input className="input-field" placeholder="https://github.com/..." value={form.github} onChange={e => set('github', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Live Demo URL</label>
          <input className="input-field" placeholder="https://..." value={form.demo} onChange={e => set('demo', e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={form.featured}
          onChange={e => set('featured', e.target.checked)}
          className="w-4 h-4 accent-purple-500"
        />
        <label htmlFor="featured" className="text-sm font-mono" style={{ color: 'rgba(232,232,240,0.6)' }}>
          Mark as Featured Project
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
          {initial?.id ? 'Update Project' : 'Add Project'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary py-2.5 px-6 text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── Main Admin Page ───────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [profile, setProfile] = useState(null)
  const [skills, setSkills] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [profileDraft, setProfileDraft] = useState(null)
  const [saved, setSaved] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProjects(getProjects())
    const p = getProfile()
    setProfile(p)
    setProfileDraft(p)
    setSkills(getSkills())
    setMounted(true)
  }, [])

  const showSaved = (msg) => {
    setSaved(msg)
    setTimeout(() => setSaved(''), 2500)
  }

  // ── Project CRUD ────────────────────────────────────────────────────────
  const handleAddProject = (project) => {
    const updated = addProject(project)
    setProjects(updated)
    setShowForm(false)
    showSaved('Project added successfully!')
  }

  const handleUpdateProject = (project) => {
    const updated = updateProject(editProject.id, project)
    setProjects(updated)
    setEditProject(null)
    showSaved('Project updated!')
  }

  const handleDeleteProject = (id) => {
    const updated = deleteProject(id)
    setProjects(updated)
    setDeleteConfirm(null)
    showSaved('Project deleted.')
  }

  // ── Profile ──────────────────────────────────────────────────────────────
  const handleSaveProfile = () => {
    saveProfile(profileDraft)
    setProfile(profileDraft)
    showSaved('Profile saved!')
  }

  const setProfileField = (key, value) => {
    setProfileDraft(d => ({ ...d, [key]: value }))
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    if (confirm('Reset all data to defaults? This cannot be undone.')) {
      resetToDefaults()
      setProjects(getProjects())
      const p = getProfile()
      setProfile(p)
      setProfileDraft(p)
      setSkills(getSkills())
      showSaved('Reset to defaults.')
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050508' }}>
        <p className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.3)' }}>Loading admin...</p>
      </div>
    )
  }

  const tabs = [
    { id: 'projects', label: '⬡ Projects', count: projects.length },
    { id: 'profile', label: '◉ Profile', count: null },
    { id: 'skills', label: '◈ Skills', count: skills.length },
    { id: 'settings', label: '⚙ Settings', count: null },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#050508' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 py-4"
        style={{ background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124,58,237,0.2)' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #00F5FF)' }}
              >
                <span className="text-white font-bold text-sm font-display">S</span>
              </div>
            </a>
            <div style={{ width: '1px', height: '24px', background: 'rgba(124,58,237,0.3)' }} />
            <span className="text-sm font-mono" style={{ color: '#9D5CF2' }}>Admin Panel</span>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span
                className="text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}
              >
                ✓ {saved}
              </span>
            )}
            <a
              href="/"
              className="text-xs font-mono px-3 py-1.5 rounded-md transition-colors"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#9D5CF2' }}
            >
              ← View Portfolio
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl" style={{ background: 'rgba(13,13,26,0.8)', border: '1px solid rgba(124,58,237,0.15)' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-mono transition-all duration-200"
              style={{
                background: tab === t.id ? 'rgba(124,58,237,0.3)' : 'transparent',
                color: tab === t.id ? '#E8E8F0' : 'rgba(232,232,240,0.4)',
                border: tab === t.id ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent',
              }}
            >
              {t.label}
              {t.count !== null && (
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(124,58,237,0.3)', color: '#9D5CF2' }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── PROJECTS TAB ──────────────────────────────── */}
        {tab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader
                title="Manage Projects"
                subtitle="Add, edit, and delete portfolio projects"
              />
              {!showForm && !editProject && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary py-2 px-5 text-sm"
                >
                  + Add Project
                </button>
              )}
            </div>

            {/* Add form */}
            {showForm && (
              <div
                className="rounded-2xl p-6 mb-6"
                style={{ background: 'rgba(13,13,26,0.8)', border: '1px solid rgba(124,58,237,0.25)' }}
              >
                <h3 className="text-base font-display font-semibold text-ghost mb-5">New Project</h3>
                <ProjectForm onSave={handleAddProject} onCancel={() => setShowForm(false)} />
              </div>
            )}

            {/* Edit form */}
            {editProject && (
              <div
                className="rounded-2xl p-6 mb-6"
                style={{ background: 'rgba(13,13,26,0.8)', border: '1px solid rgba(0,245,255,0.25)' }}
              >
                <h3 className="text-base font-display font-semibold text-ghost mb-5">
                  Editing: <span className="gradient-text">{editProject.title}</span>
                </h3>
                <ProjectForm
                  initial={{
                    ...editProject,
                    tags: Array.isArray(editProject.tags) ? editProject.tags.join(', ') : editProject.tags,
                    metrics: Array.isArray(editProject.metrics) ? editProject.metrics.join(', ') : editProject.metrics,
                  }}
                  onSave={handleUpdateProject}
                  onCancel={() => setEditProject(null)}
                />
              </div>
            )}

            {/* Project list */}
            <div className="space-y-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl p-5 flex items-start gap-4"
                  style={{
                    background: 'rgba(13,13,26,0.7)',
                    border: '1px solid rgba(124,58,237,0.15)',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-semibold text-ghost text-sm">{p.title}</h3>
                      {p.featured && <Badge color="#FFB700">★ Featured</Badge>}
                      <Badge color={p.status === 'Production' ? '#4ade80' : '#7C3AED'}>{p.status}</Badge>
                      <Badge color="#00F5FF">{p.category}</Badge>
                    </div>
                    <p className="text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.4)' }}>{p.subtitle}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,232,240,0.5)' }}>
                      {p.description?.slice(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(Array.isArray(p.tags) ? p.tags : []).slice(0, 4).map(t => (
                        <span key={t} className="text-xs font-mono" style={{ color: 'rgba(124,58,237,0.7)' }}>#{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setEditProject(p); setShowForm(false) }}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
                      style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)', color: '#00F5FF' }}
                    >
                      Edit
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg"
                          style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171' }}
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs font-mono px-2 py-1.5 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,232,240,0.5)' }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-ghost/20 font-mono text-sm">No projects yet. Add your first one!</p>
                  <button onClick={() => setShowForm(true)} className="btn-primary mt-4 py-2 px-6 text-sm">
                    + Add First Project
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PROFILE TAB ──────────────────────────────────── */}
        {tab === 'profile' && profileDraft && (
          <div>
            <SectionHeader title="Edit Profile" subtitle="Update your personal info and links" />

            <div
              className="rounded-2xl p-6 space-y-5"
              style={{ background: 'rgba(13,13,26,0.8)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Full Name</label>
                  <input className="input-field" value={profileDraft.name || ''} onChange={e => setProfileField('name', e.target.value)} placeholder="Sohaib" />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Title</label>
                  <input className="input-field" value={profileDraft.title || ''} onChange={e => setProfileField('title', e.target.value)} placeholder="AI/ML Engineer..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Bio</label>
                <textarea rows={4} className="input-field" value={profileDraft.bio || ''} onChange={e => setProfileField('bio', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Location</label>
                  <input className="input-field" value={profileDraft.location || ''} onChange={e => setProfileField('location', e.target.value)} placeholder="Bahawalpur, Pakistan" />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Email</label>
                  <input type="email" className="input-field" value={profileDraft.email || ''} onChange={e => setProfileField('email', e.target.value)} placeholder="you@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>GitHub URL</label>
                  <input className="input-field" value={profileDraft.github || ''} onChange={e => setProfileField('github', e.target.value)} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>LinkedIn URL</label>
                  <input className="input-field" value={profileDraft.linkedin || ''} onChange={e => setProfileField('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Kaggle URL</label>
                  <input className="input-field" value={profileDraft.kaggle || ''} onChange={e => setProfileField('kaggle', e.target.value)} placeholder="https://kaggle.com/..." />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'rgba(232,232,240,0.5)' }}>Availability Status</label>
                  <input className="input-field" value={profileDraft.availability || ''} onChange={e => setProfileField('availability', e.target.value)} placeholder="Open to opportunities..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-3" style={{ color: 'rgba(232,232,240,0.5)' }}>Stats (shown in hero)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(profileDraft.stats || []).map((stat, i) => (
                    <div key={i} className="glass rounded-lg p-3 space-y-2">
                      <input
                        className="input-field text-center text-lg font-display font-bold"
                        value={stat.value}
                        onChange={e => {
                          const newStats = [...profileDraft.stats]
                          newStats[i] = { ...stat, value: e.target.value }
                          setProfileField('stats', newStats)
                        }}
                        style={{ padding: '6px', background: 'rgba(0,0,0,0.3)', height: '40px' }}
                      />
                      <input
                        className="input-field text-center text-xs"
                        value={stat.label}
                        onChange={e => {
                          const newStats = [...profileDraft.stats]
                          newStats[i] = { ...stat, label: e.target.value }
                          setProfileField('stats', newStats)
                        }}
                        style={{ padding: '4px 6px', background: 'rgba(0,0,0,0.3)', height: '30px' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleSaveProfile} className="btn-primary py-2.5 px-8 text-sm">
                Save Profile →
              </button>
            </div>
          </div>
        )}

        {/* ── SKILLS TAB ──────────────────────────────────────── */}
        {tab === 'skills' && (
          <div>
            <SectionHeader title="Manage Skills" subtitle="Edit your technical skill categories" />

            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ background: 'rgba(13,13,26,0.7)', border: '1px solid rgba(124,58,237,0.15)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <p className="font-display font-semibold text-ghost text-sm">{skill.category}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: skill.color }}>{skill.items.length} technologies</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(232,232,240,0.4)' }}>
                      Technologies (comma separated)
                    </label>
                    <textarea
                      rows={2}
                      className="input-field"
                      value={skill.items.join(', ')}
                      onChange={e => {
                        const updated = [...skills]
                        updated[i] = {
                          ...skill,
                          items: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                        setSkills(updated)
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => { saveSkills(skills); showSaved('Skills saved!') }}
                className="btn-primary py-2.5 px-8 text-sm"
              >
                Save All Skills →
              </button>
            </div>
          </div>
        )}

        {/* ── SETTINGS TAB ──────────────────────────────────────── */}
        {tab === 'settings' && (
          <div>
            <SectionHeader title="Settings" subtitle="Manage your portfolio data" />

            <div className="space-y-4">
              <div className="rounded-xl p-6" style={{ background: 'rgba(13,13,26,0.7)', border: '1px solid rgba(124,58,237,0.15)' }}>
                <h3 className="font-display font-semibold text-ghost text-sm mb-2">Portfolio Stats</h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[
                    { label: 'Projects', value: projects.length },
                    { label: 'Featured', value: projects.filter(p => p.featured).length },
                    { label: 'Skill Categories', value: skills.length },
                  ].map(s => (
                    <div key={s.label} className="text-center p-4 rounded-lg" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                      <div className="text-2xl font-display font-bold gradient-text">{s.value}</div>
                      <div className="text-xs font-mono mt-1" style={{ color: 'rgba(232,232,240,0.4)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <h3 className="font-display font-semibold text-red-400 text-sm mb-2">Danger Zone</h3>
                <p className="text-xs font-mono mb-4" style={{ color: 'rgba(232,232,240,0.4)' }}>
                  Reset all portfolio data to the default template values. This action cannot be undone.
                </p>
                <button
                  onClick={handleReset}
                  className="text-sm font-mono px-5 py-2 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171' }}
                >
                  Reset to Defaults
                </button>
              </div>

              <div className="rounded-xl p-6" style={{ background: 'rgba(13,13,26,0.7)', border: '1px solid rgba(124,58,237,0.15)' }}>
                <h3 className="font-display font-semibold text-ghost text-sm mb-2">Quick Links</h3>
                <div className="space-y-2 mt-3">
                  <a href="/" className="flex items-center gap-2 text-xs font-mono py-2" style={{ color: '#9D5CF2' }}>
                    ← View Live Portfolio
                  </a>
                  <p className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.3)' }}>
                    Admin URL: /admin · Data stored in localStorage
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
