/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand': {
          'brown': '#bd5c2b',
          'yellow': '#fbfd82',
          'dark': '#232323',
          'light': '#f2f2f2',
        }
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #bd5c2b 0%, #232323 100%)',
        'gradient-brand-reverse': 'linear-gradient(135deg, #232323 0%, #bd5c2b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #bd5c2b 0%, #fbfd82 100%)',
      }
    },
  },
  plugins: [],
};