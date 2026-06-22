export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{ borderTop: '1px solid rgba(124, 58, 237, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'rgba(232,232,240,0.25)' }}>
          © {new Date().getFullYear()} Sohaib · Built with Next.js + Three.js
        </p>
        <p className="text-xs font-mono" style={{ color: 'rgba(124, 58, 237, 0.5)' }}>
          Designed & Developed by Sohaib · Bahawalpur, Pakistan 🇵🇰
        </p>
        <a
          href="/admin"
          className="text-xs font-mono transition-colors duration-200"
          style={{ color: 'rgba(232,232,240,0.2)' }}
          onMouseEnter={e => e.target.style.color = 'rgba(124,58,237,0.6)'}
          onMouseLeave={e => e.target.style.color = 'rgba(232,232,240,0.2)'}
        >
          admin ›
        </a>
      </div>
    </footer>
  )
}
