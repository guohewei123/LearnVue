module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    "space-before-function-paren": [0, "always"],
    "object-curly-spacing": [0, "always"],
    "no-multi-spaces": [0, "always"],
    "object-property-newline": [0, "always"],
  }
}
