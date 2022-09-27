/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e0f2fe',
        'secondary': '#7dd3fc',
        'tertiary': '#4ade80'
      }
    },
  },
  plugins: [],
}
