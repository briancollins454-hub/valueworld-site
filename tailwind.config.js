/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colours taken from the Value World logo: red, and green from the tick.
        brand: { DEFAULT: '#e1061b', dark: '#b8000f', light: '#fde8ea', logo: '#f4021a' },
        leaf: { DEFAULT: '#16784f', dark: '#0f5c3c', light: '#e3f2ea' },
        sun: { DEFAULT: '#ffd200', dark: '#e6b800' },
        ink: { DEFAULT: '#14181b', soft: '#4b5359', faint: '#7a8288' },
        paper: { DEFAULT: '#ffffff', warm: '#fbf7f2' },
      },
      fontFamily: {
        display: ['"Nunito Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1160px' },
    },
  },
  plugins: [],
};
