import fs from "fs";

export default ({ $logger }) => {
  let config = {};

  const file = `${process.cwd()}/whppt.config.js`;
  $logger.info("Loading config from %s", file);
  if (fs.existsSync(file)) {
    config = require(file) || {};
  }

  $logger.info("Whppt starting with config %o", config);
  return config;
};
