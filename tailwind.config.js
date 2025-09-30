/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'red-cross-blue': '#002888',
        'red-cross-red': '#E3000E',
        'red-cross-light-blue': '#e6f0ff',
        'red-cross-secondary-blue': '#1a4ba8'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
