const d = require("debug");

const debug = {
  dev: d("whppt:dev"),
  info: d("whppt:info"),
  warning: d("whppt:warning"),
  error: d("whppt:error")
};

module.exports = debug;
