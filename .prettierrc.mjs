// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    '@svgr/plugin-prettier'
  ]
}
