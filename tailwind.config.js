/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        coffee: {
          50: '#FAF6F1',   // foam
          100: '#F5EDE4',  // cream
          200: '#E8DDD4',  // latte
          300: '#C4A77D',  // light roast
          400: '#8B6914',  // caramel
          500: '#6F4E37',  // mocha
          600: '#5C4033',  // medium roast
          700: '#4A3528',  // dark roast
          800: '#3D2817',  // espresso
          900: '#2C1810',  // black coffee
        },
      },
    },
  },
  plugins: [],
}
