/** @type {import('tailwindcss').Config} */
import "preline/plugin"
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      screens:{
        'tablet':{'max':'1159px'}
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}