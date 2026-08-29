/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--color-void-rgb) / <alpha-value>)',
        panel: 'rgb(var(--color-panel-rgb) / <alpha-value>)',
        raised: 'rgb(var(--color-raised-rgb) / <alpha-value>)',
        steel: 'rgb(var(--color-steel-rgb) / <alpha-value>)',
        'signal-blue': 'rgb(var(--color-signal-blue-rgb) / <alpha-value>)',
        'signal-bright': 'rgb(var(--color-signal-bright-rgb) / <alpha-value>)',
        'fog-white': 'rgb(var(--color-fog-white-rgb) / <alpha-value>)',
        'instrument-grey': 'rgb(var(--color-instrument-grey-rgb) / <alpha-value>)',
        'clear-green': 'rgb(var(--color-clear-green-rgb) / <alpha-value>)',
        'caution-amber': 'rgb(var(--color-caution-amber-rgb) / <alpha-value>)',
        'alert-red': 'rgb(var(--color-alert-red-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'pill': '12px',
        'card': '10px',
        'frame': '14px',
      }
    },
  },
  plugins: [],
}

