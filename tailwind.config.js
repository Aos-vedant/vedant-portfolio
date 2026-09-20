/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['"Syne"', 'sans-serif'],
        display: ['"Syne"', '"Sora"', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        atelier: {
          paper: '#f7f5f0',
          card: '#ffffff',
          ink: '#121316',
          muted: '#62646c',
          border: '#e6e2d8',
          accent: '#ff4d2e', // Bauhaus vermilion
          'accent-dim': 'rgba(255, 77, 46, 0.08)',
          'accent-blue': '#1a44e8', // Yves Klein cobalt
        }
      },
      boxShadow: {
        'atelier-card': '0 2px 0 rgba(18, 19, 22, 0.04), 0 8px 24px -4px rgba(18, 19, 22, 0.04)',
        'atelier-hover': '0 4px 0 rgba(18, 19, 22, 0.06), 0 20px 36px -8px rgba(18, 19, 22, 0.08)',
        'atelier-pop': '4px 4px 0px rgba(18, 19, 22, 0.08)',
      }
    },
  },
  plugins: [],
}
