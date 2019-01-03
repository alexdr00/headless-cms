module.exports = {
  parser: 'babel-eslint',
  rules: {
    'max-len': ['error', { code: 80 }],
  },
  env: { es6: true, browser: true, jest: true },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: 'airbnb',
};
