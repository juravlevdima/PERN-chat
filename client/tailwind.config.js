/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '15px'
    },
    extend: {
      colors: {
        'modal': 'rgba(0, 0, 0, .6)',
        'dark-0': 'rgba(1, 4, 9, 1)',
        'dark-1': 'rgba(23, 23, 23, 1)',
        'dark-2': 'rgba(32, 33, 36, 1)',
        'dark-3': 'rgba(48, 49, 52, 1)',
        'dark-4': 'rgba(57, 58, 61, 1)',
      },
      transitionProperty: {
        'bg-color': 'background-color',
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
}
