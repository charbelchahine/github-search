module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    // 'jest/globals': true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'prettier', 'react-hooks', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['off', 'never'],
    'eol-last': ['error', 'always'],
    'no-underscore-dangle': 0,
    'max-len': ['error', { code: 255 }],
    'prefer-arrow-callback': ['warn'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [1, { ignorePureComponents: true }],
  },
};
