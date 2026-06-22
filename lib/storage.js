// Default portfolio data
export const DEFAULT_PROFILE = {
  name: 'Sohaib',
  title: 'AI/ML Engineer & Agentic AI Systems Builder',
  tagline: 'Building Intelligent Systems That Think, Adapt & Scale',
  bio: `5th semester CS student at IUB, Bahawalpur — self-taught AI/ML practitioner and freelancer on a mission to build category-defining AI products. I architect multi-agent systems, build production ML pipelines, and automate workflows that deliver real business impact. Currently completing an AI/ML internship at Hexovate Solutions while competing in global AI hackathons.`,
  location: 'Bahawalpur, Pakistan',
  email: 'sohaib@example.com',
  github: 'https://github.com/sohaib',
  linkedin: 'https://linkedin.com/in/sohaib',
  kaggle: 'https://kaggle.com/sohaib',
  availability: 'Open to Freelance & Full-Time Opportunities',
  stats: [
    { label: 'Projects Built', value: '20+' },
    { label: 'Hackathons', value: '6+' },
    { label: 'ML Models', value: '15+' },
    { label: 'Automations', value: '30+' },
  ]
}

export const DEFAULT_SKILLS = [
  {
    category: 'Agentic AI Systems',
    icon: '🤖',
    color: '#7C3AED',
    items: ['LangGraph', 'LangChain', 'Google ADK 2.0', 'Multi-Agent Orchestration', 'RAG Pipelines', 'Tool Use & Function Calling']
  },
  {
    category: 'AI Automation',
    icon: '⚡',
    color: '#00F5FF',
    items: ['n8n Workflows', 'WhatsApp API', 'Meta Cloud API', 'Webhook Orchestration', 'API Integration', 'Process Automation']
  },
  {
    category: 'ML Engineering',
    icon: '🧠',
    color: '#FFB700',
    items: ['XGBoost', 'scikit-learn', 'SHAP Analysis', 'GridSearchCV', 'Ensemble Methods', 'Feature Engineering']
  },
  {
    category: 'Deep Learning',
    icon: '🔬',
    color: '#F472B6',
    items: ['PyTorch', 'TensorFlow', 'CNNs', 'NLP & Transformers', 'Transfer Learning', 'Model Optimization']
  },
  {
    category: 'Backend & Infrastructure',
    icon: '🚀',
    color: '#4ade80',
    items: ['FastAPI', 'Docker', 'Streamlit', 'ChromaDB', 'PostgreSQL', 'REST APIs']
  },
  {
    category: 'LLM Platforms',
    icon: '💡',
    color: '#FB923C',
    items: ['Anthropic Claude API', 'OpenAI GPT-4o', 'Llama 3.1 (Local)', 'Ollama', 'Groq', 'HuggingFace']
  }
]

export const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'ORACLE',
    subtitle: 'Demand Forecasting Engine',
    description: 'Production-grade multi-model demand forecasting system combining XGBoost ensemble, Holt-Winters exponential smoothing, and Ridge regression. Features SHAP explainability, cyberpunk Streamlit dashboard, and FastAPI backend.',
    tags: ['XGBoost', 'SHAP', 'FastAPI', 'Streamlit', 'Holt-Winters', 'Python'],
    category: 'ML Engineering',
    status: 'Production',
    github: 'https://github.com/sohaib',
    demo: '',
    featured: true,
    metrics: ['94.2% Accuracy', 'SHAP Explainability', 'Real-time API'],
  },
  {
    id: '2',
    title: 'PROPHET-X',
    subtitle: 'Customer Churn Intelligence',
    description: 'Advanced churn prediction system with ensemble ML models, SHAP-based retention recommendations, and business intelligence dashboard. Provides actionable AI-driven retention strategies for each at-risk customer.',
    tags: ['scikit-learn', 'SHAP', 'FastAPI', 'Streamlit', 'Ensemble ML'],
    category: 'ML Engineering',
    status: 'Production',
    github: 'https://github.com/sohaib',
    demo: '',
    featured: true,
    metrics: ['91.8% AUC', 'Customer-level SHAP', 'Retention Engine'],
  },
  {
    id: '3',
    title: 'SYNAPSE',
    subtitle: 'Multi-Agent Decision Platform',
    description: 'Cutting-edge multi-agent LangGraph orchestration platform with Reflexion self-improvement loop, Constitutional AI guardrails, SSE streaming, and WebSocket frontend. Agents reason, debate, and reach consensus.',
    tags: ['LangGraph', 'LangChain', 'FastAPI', 'WebSocket', 'SSE', 'Anthropic'],
    category: 'Agentic AI',
    status: 'Production',
    github: 'https://github.com/sohaib',
    demo: '',
    featured: true,
    metrics: ['5 Specialized Agents', 'Reflexion Loop', 'Real-time Streaming'],
  },
  {
    id: '4',
    title: 'ARIA v3',
    subtitle: 'Local RAG Assistant',
    description: 'Fully local RAG assistant using LLaMA 3.1, ChromaDB, and FastAPI with SSE streaming. Features adaptive context retrieval, query classification, per-file RAG focus mode, and zero-latency local inference.',
    tags: ['LLaMA 3.1', 'ChromaDB', 'FastAPI', 'RAG', 'SSE', 'Ollama'],
    category: 'Agentic AI',
    status: 'Production',
    github: 'https://github.com/sohaib',
    demo: '',
    featured: false,
    metrics: ['100% Local', 'Adaptive RAG', 'Per-file Focus'],
  },
  {
    id: '5',
    title: 'KissanAI',
    subtitle: 'Multilingual Agricultural AI',
    description: 'AI agricultural advisor for Pakistani farmers supporting English, Urdu, Roman Urdu, and Punjabi. Built for HEC GenAI Hackathon — combines crop disease detection, weather analysis, and livestock veterinary guidance.',
    tags: ['LLM', 'Multilingual', 'FastAPI', 'Vision AI', 'Agriculture'],
    category: 'AI Applications',
    status: 'Hackathon',
    github: 'https://github.com/sohaib',
    demo: '',
    featured: false,
    metrics: ['4 Languages', 'Crop Disease Detection', 'Pakistan-first'],
  },
  {
    id: '6',
    title: 'RevenueGuard',
    subtitle: 'ADK 2.0 Retention System',
    description: 'Multi-agent business retention system built on Google ADK 2.0 for the Google AI Agents Hackathon. PROPHET-X churn predictions feed ORACLE demand forecasts in a unified agentic retention workflow.',
    tags: ['Google ADK 2.0', 'Multi-Agent', 'LangGraph', 'Python', 'Kaggle'],
    category: 'Agentic AI',
    status: 'Hackathon',
    github: 'https://github.com/sohaib',
    demo: '',
    featured: true,
    metrics: ['ADK 2.0', 'Multi-Agent', 'Business Intelligence'],
  },
]

// Storage keys
const PROFILE_KEY = 'portfolio_profile'
const SKILLS_KEY = 'portfolio_skills'
const PROJECTS_KEY = 'portfolio_projects'

// Profile
export function getProfile() {
  if (typeof window === 'undefined') return DEFAULT_PROFILE
  try {
    const stored = localStorage.getItem(PROFILE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE
  } catch { return DEFAULT_PROFILE }
}

export function saveProfile(profile) {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

// Projects
export function getProjects() {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS
  try {
    const stored = localStorage.getItem(PROJECTS_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS
  } catch { return DEFAULT_PROJECTS }
}

export function saveProjects(projects) {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
}

export function addProject(project) {
  const projects = getProjects()
  const newProject = { ...project, id: Date.now().toString() }
  const updated = [newProject, ...projects]
  saveProjects(updated)
  return updated
}

export function updateProject(id, updates) {
  const projects = getProjects()
  const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p)
  saveProjects(updated)
  return updated
}

export function deleteProject(id) {
  const projects = getProjects()
  const updated = projects.filter(p => p.id !== id)
  saveProjects(updated)
  return updated
}

// Skills
export function getSkills() {
  if (typeof window === 'undefined') return DEFAULT_SKILLS
  try {
    const stored = localStorage.getItem(SKILLS_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_SKILLS
  } catch { return DEFAULT_SKILLS }
}

export function saveSkills(skills) {
  if (typeof window === 'undefined') return
  localStorage.setItem(SKILLS_KEY, JSON.stringify(skills))
}

// Reset to defaults
export function resetToDefaults() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PROFILE_KEY)
  localStorage.removeItem(PROJECTS_KEY)
  localStorage.removeItem(SKILLS_KEY)
}
