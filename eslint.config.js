import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['astro.config.mjs'],
    languageOptions: {
      globals: {
        process: true,
        URL: true
      }
    }
  },
  {
    ignores: ['.astro/**', 'dist/**', '.wrangler/**']
  }
)
