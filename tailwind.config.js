/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          600: '#8B4513',
          800: '#5D2C0B', 
        },
        fontFamily: {
          'paytone': ['Paytone One', 'sans-serif'], 
        },
      },
    },
  },
  plugins: [],
}