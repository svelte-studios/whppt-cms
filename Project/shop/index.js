const _ = require("lodash");
const ElasticDB = require("../../src/ElasticSearch").default;

const elastic_config = require("../elasticsearch");
const product = require("./product");
const productVariant = require("./productVariant");
const sizes = require("./sizes");

const options = {
  id: "testshop",
  key: "testshop",
  name: "Test Shop",
  db: ElasticDB(elastic_config),
  cloudinary: {
    cloud_name: "",
    api_key: "",
    api_secret: ""
  },
  types: _.concat(product, productVariant, sizes)
};

module.exports = options;
