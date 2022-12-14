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
        'secondary': '#312E81',
        'tertiary': '#ec4899',
        'background': '#202020'
      },
      width: {
        'slot': '256px'
      },
      height: {
        'slot': '166px'
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'dnd': 'repeat(6, 256px)'
      },
      animation: {
        'slide-right': 'slide 500ms ease 1 forward',
        'slide-left': 'slide 500ms ease 1 reverse backward',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)'}
        }
      }
    },
  },
  plugins: [],
}
