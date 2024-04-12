/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindTypography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      screens: {
        DEFAULT: '375px',
        sm: '640px',
        lg: '1024px',
        xl: '1280px'
      },
      padding: {
        DEFAULT: '1rem',
        sm: '4.5rem',
        lg: '2rem'
      }
    },
    extend: {
      colors: {
        gray: {
          50: '#E7E8E8',
          100: '#D0D0D1',
          200: '#B8B9BA',
          300: '#A0A2A31',
          400: '#898B8C',
          500: '#717375',
          600: '#5A5C5E',
          700: '#424547',
          800: '#2A2D30',
          900: '#131619',
          default: '#131619'
        },
        link: '#055FC8',
        success: '#009959',
        error: '#D44431'
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [tailwindTypography]
}
