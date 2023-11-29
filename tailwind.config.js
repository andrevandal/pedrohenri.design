/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindTypography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    container: {
      screens: {
        sm: '640px',
        lg: '1024px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '4.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        gray: {
          50: '#EBF2F2',
          100: '#D9E1E2',
          200: '#C5CFD1',
          300: '#ADB8BC',
          400: '#8B9AA0',
          500: '#6B7C84',
          600: '#526068',
          700: '#3E4951',
          800: '#2F383F',
          900: '#262E33',
        },
        link: '#055FC8',
        success: '#009959',
        error: '#D44431',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindTypography],
}
