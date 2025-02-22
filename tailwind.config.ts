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
        primary: '#646cff',
        'primary-hover': '#535bf2',
        'light-bg': '#ffffff',
        'dark-bg': '#242424',
        'light-text': '#213547',
        'dark-text': 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
