/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        neural: '#7C3AED',
        'neural-light': '#9D5CF2',
        'neural-dark': '#5B21B6',
        cyan: {
          electric: '#00F5FF',
          soft: '#67E8F9',
        },
        ghost: '#E8E8F0',
        'void-gray': '#1A1A2E',
        'void-mid': '#0F0F1A',
        amber: {
          electric: '#FFB700',
        },
        surface: {
          1: '#0D0D1A',
          2: '#141428',
          3: '#1E1E3A',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 4s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px #7C3AED, 0 0 20px #7C3AED' },
          '100%': { boxShadow: '0 0 20px #00F5FF, 0 0 40px #00F5FF' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(124, 58, 237, 0.5)' },
          '50%': { borderColor: 'rgba(0, 245, 255, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-neural': 'linear-gradient(135deg, #7C3AED 0%, #00F5FF 100%)',
        'gradient-void': 'linear-gradient(180deg, #050508 0%, #0D0D1A 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(0, 245, 255, 0.05) 100%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
