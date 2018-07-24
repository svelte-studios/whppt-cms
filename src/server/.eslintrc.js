module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "problems"
  ],
  rules: {
    "linebreak-style": ["error", "unix"],
    "no-use-before-define": 0,
    "no-duplicate-imports": 1,
    "no-extra-semi": 1,
    "no-undef": 1,
    "prefer-const": 1,
    "prefer-arrow-callback": 1,
    eqeqeq: 1,
    "object-shorthand": 1,
    "no-var": 1,
    "no-unreachable": 1,
    "no-buffer-constructor": 1,
    "no-path-concat": 1,
    "prefer-template": 1,
    "no-extra-boolean-cast": 1,
    "no-unused-vars": 1
  }
};
