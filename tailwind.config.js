/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['Parisienne', 'cursive'],
      },
      colors: { night: '#0B0613' },
    },
  },
  plugins: [],
}
