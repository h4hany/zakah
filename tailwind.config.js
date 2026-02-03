/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A24D',
          50: '#F5F0E4',
          100: '#E8DCC4',
          200: '#DBC8A4',
          300: '#CEB484',
          400: '#C9A24D',
          500: '#B8923D',
          600: '#A7822D',
          700: '#96721D',
        },
        dark: {
          DEFAULT: '#212325',
          50: '#4A4C4E',
          100: '#3E4042',
          200: '#323436',
          300: '#26282A',
          400: '#212325',
          500: '#1A1C1E',
        },
        surface: {
          DEFAULT: '#E7E9EB',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}


