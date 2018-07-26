const _ = require("lodash");
const ElasticDB = require("whppt/ElasticDB").default;

const elastic_config = require("./elasticsearch");
const article = require("./article");
const page = require("./page");
const setting = require("./setting");
const openinghours = require("./openinghours");

const options = {
  id: "test",
  name: "Test",
  db: ElasticDB(elastic_config),
  cloudinary: {
    cloud_name: "dne6gsjnx",
    api_key: "",
    api_secret: ""
  },
  types: _.concat(openinghours, article, page, setting)
};

module.exports = options;
