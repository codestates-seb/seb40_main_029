module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended', // 설치 한경우
    'plugin:import/errors', // 설치한 경우
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'no-nested-ternary': 0,
    'react/jsx-props-no-spreading': 'off',
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import/named': 0,
  },
};
