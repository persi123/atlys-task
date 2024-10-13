/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        titleGray:'#f8fafc',
      },
      width:{
        'wi-31':'7.1rem',
      }
    },
  },
  plugins: [],
}

