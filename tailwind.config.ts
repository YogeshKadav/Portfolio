import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-cyan': '#00f0ff',
        'cyber-purple': '#8a2be2',
        'cyber-pink': '#ff00ff',
        'cyber-dark': '#050505',
        'cyber-surface': '#0a0a1a',
      },
      fontFamily: {
        mono: ['Share Tech Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 3s infinite',
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
          '50%': { boxShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 60px #00f0ff' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glitch': {
          '0%, 100%': { clipPath: 'inset(0 0 98% 0)', transform: 'translate(-2px, 0)' },
          '25%': { clipPath: 'inset(30% 0 40% 0)', transform: 'translate(2px, 0)' },
          '50%': { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(-2px, 0)' },
          '75%': { clipPath: 'inset(90% 0 5% 0)', transform: 'translate(2px, 0)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}

export default config
