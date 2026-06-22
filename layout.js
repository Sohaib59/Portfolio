import './globals.css'

export const metadata = {
  title: 'Sohaib | AI/ML Engineer & Agentic AI Systems',
  description: 'Building intelligent systems that think, adapt, and scale. AI/ML Engineer specializing in Agentic AI, Deep Learning, and AI Automation.',
  keywords: 'AI Engineer, ML Engineer, Agentic AI, Deep Learning, LangGraph, LangChain, n8n, FastAPI',
  openGraph: {
    title: 'Sohaib | AI/ML Engineer',
    description: 'Building the future with Agentic AI Systems',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
