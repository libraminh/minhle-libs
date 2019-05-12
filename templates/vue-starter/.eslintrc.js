module.exports = {
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  extends: [
      
      // These four options are more or less levels of strictness, give the above URL a read through and decide how strict you want your linting to be
      //   Also note we're not setting this up with general JS linting here, just .vue linting
      
      // 'plugin:vue/base',
      'plugin:vue/essential',
      'plugin:vue/strongly-recommended'
      // 'plugin:vue/recommended',
  ]
}