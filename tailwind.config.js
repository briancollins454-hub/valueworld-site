/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colours taken from the Value World logo: red, and green from the tick.
        brand: { DEFAULT: '#e1061b', dark: '#b8000f', deep: '#8f000c', light: '#fde8ea', logo: '#f4021a' },
        leaf: { DEFAULT: '#16784f', dark: '#0f5c3c', light: '#e3f2ea' },
        sun: { DEFAULT: '#ffd200', dark: '#e6b800' },
        ink: { DEFAULT: '#14181b', soft: '#4b5359', faint: '#7a8288' },
        paper: { DEFAULT: '#ffffff', warm: '#fbf7f2' },
      },
      fontFamily: {
        display: ['"Nunito Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1200px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-12px) rotate(var(--r,0deg))' } },
        rise: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pop: { '0%': { opacity: '0', transform: 'scale(.7) rotate(-8deg)' }, '100%': { opacity: '1', transform: 'scale(1) rotate(0)' } },
        spinslow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        float: 'float 6s ease-in-out infinite',
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
        pop: 'pop .9s cubic-bezier(.2,.9,.25,1.2) both',
        spinslow: 'spinslow 60s linear infinite',
      },
    },
  },
  plugins: [],
};
