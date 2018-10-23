const d = require("debug");

const debug = {
  dev: d("whppt-es:dev"),
  info: d("whppt-es:info"),
  warning: d("whppt-es:warning"),
  error: d("whppt-es:error")
};

module.exports = debug;
