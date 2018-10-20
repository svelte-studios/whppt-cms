const _ = require("lodash");
const ElasticDB = require("../../src/ElasticSearch").default;

const elastic_config = require("../elasticsearch");
const article = require("./article");
const page = require("./page");
const setting = require("./setting");
const openinghours = require("./openinghours");

const options = {
  id: "test",
  key: "test123",
  name: "Test",
  db: ElasticDB(elastic_config),
  cloudinary: {
    cloud_name: "",
    api_key: "",
    api_secret: ""
  },
  types: _.concat(openinghours, article, page, setting)
};

module.exports = options;
