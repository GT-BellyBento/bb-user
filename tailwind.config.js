/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5841F',
          50: '#FEF3E8',
          100: '#FDE7D1',
          200: '#FBCFA3',
          300: '#F9B776',
          400: '#F79F48',
          500: '#F5841F',
          600: '#D06A0C',
          700: '#9C500A',
          800: '#683507',
          900: '#341B03',
        },
        dark: '#3D4852',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
