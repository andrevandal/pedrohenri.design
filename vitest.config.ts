/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}']
    // setupFiles: ['./vitest.setup.js'],
    // environment: 'jsdom'
    // deps: {
    //   inline: ['@astrojs/image']
    // }
  },
  plugins: [tsconfigPaths()]
})
