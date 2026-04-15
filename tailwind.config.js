/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F0F11',
          card: '#1A1A1E',
        },
        primary: '#6C5CE7',
      },
    },
  },
  plugins: [],
}