module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // 此行必须在最后
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    // 支持最新 JavaScript
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['**/grpc/generated.ts', 'node_modules','*.js'],
  rules: {
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'node/no-unpublished-import': 'off',
  },
};
