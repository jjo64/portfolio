/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00ff88',
        'accent-dim': 'rgba(0,255,136,0.18)',
        'accent-glow': 'rgba(0,255,136,0.07)',
        cyan: '#00d4ff',
        'cyan-dim': 'rgba(0,212,255,0.18)',
        danger: '#ff3366',
        warn: '#ffcc00',
        bg: '#050508',
        surface: '#0a0a10',
        surface2: '#0f0f18',
        border: '#151520',
        border2: '#1e1e30',
        txt: '#e8e8f5',
        muted: '#44445a',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
