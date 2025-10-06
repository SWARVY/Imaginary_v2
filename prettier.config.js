/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'auto',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
