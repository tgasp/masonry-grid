/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#c208c1',
        'primary-hover': '#a007a0',
        'light-bg': '#ffffff',
        'dark-bg': '#242424',
        'light-text': '#111827',
        'dark-text': 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
