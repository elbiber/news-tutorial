module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2],
    'no-tabs': 'warn',
    'linebreak-style': ['error', 'windows'],
    "object-curly-spacing": ["error", "always"],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-new': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'no-alert': 'warn',
    'max-len': ['error', { code: 220 }],
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
    'no-var': 'error',
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }]
  },
};
