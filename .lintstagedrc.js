export default {
  '*.{ts,tsx}': ['eslint --fix'],
  '*.{cjs,mjs,js,ts,tsx,css,scss,json,html,graphql,md}': ['prettier --write --ignore-path .gitignore'],
}
