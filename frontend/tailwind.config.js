/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Comfortaa"', 'sans-serif'],
        kalam: ['"Kalam"', 'cursive'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.8)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        floatIn: {
          'from': { opacity: '0', transform: 'translateY(-20px) rotate(0deg)' },
          'to': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--rotation))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--rotation))' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out 1.5s both',
        scaleIn: 'scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both',
      }
    },
  },
  plugins: [],
}
