module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'func-names': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
  },
  globals: {
    __basedir: false,
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'global-require': 'off',
      },
    },
  ],
};
