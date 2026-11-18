/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colours: swap these for Value World's exact logo colours once Pat confirms them.
        brand: { DEFAULT: '#d6111e', dark: '#a50d17', light: '#fde8ea' },
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
