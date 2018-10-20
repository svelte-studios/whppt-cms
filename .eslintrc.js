const ignore = 0;
const warn = 1;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // parser: "babel-eslint",
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "problems"
  ],
  // required to lint *.vue files
  plugins: [
    "vue"
    // [
    //   "module-resolver",
    //   {
    //     root: ["."],
    //     alias: {
    //       "~": "./web"
    //     }
    //   }
    // ]
  ],
  rules: {
    "no-unused-vars": warn,
    eqeqeq: warn,
    "import/no-unresolved": warn,
    "no-use-before-define": ignore
  },
  globals: {
    google: false,
    _: false,
    Vuex: false,
    axios: false
  }
};
