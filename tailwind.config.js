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
      keyframes: {
        'orbit-3d': {
          '0%': { transform: 'rotateX(55deg) rotateY(0deg) translateZ(5.5rem)' },
          '100%': { transform: 'rotateX(55deg) rotateY(360deg) translateZ(5.5rem)' },
        },
        'orbit-counter': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-360deg)' },
        },
      },
      animation: {
        'orbit-3d': 'orbit-3d 25s linear infinite',
        'orbit-counter': 'orbit-counter 25s linear infinite',
      },
    },
  },
  plugins: [],
}
