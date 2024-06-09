/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindTypography from '@tailwindcss/typography'

const generateEvenNumbersInRange = (start, end) => {
  return Array.from(
    { length: (end - start) / 2 + 1 },
    (_, index) => start + index * 2
  )
}

const fontSizes = Object.fromEntries(
  generateEvenNumbersInRange(12, 96).map((size) => [size, `${size / 16}rem`])
)

export const screens = {
  sm: '640px',
  lg: '1024px',
  xl: '1280px'
}

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens,
    container: false,
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      },
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
      fontSize: fontSizes,
      lineHeight: fontSizes,
      fontFamily: {
        sans: ['Stara', 'Stara Fallback', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        22: '5.5rem'
      }
    }
  },
  plugins: [tailwindTypography]
}
