const ElasticDB = require("./src/ElasticSearch").default;

const blog = require("./Project/blog");
const store = require("./Project/shop");
const elastic_config = require("./Project/elasticsearch");

module.exports = {
  db: ElasticDB(elastic_config),
  projects: [blog, store],
  security: {
    token: {
      // this will be used by JWT
      secret: "topsecret", // suggestion is to use a 256bit string here
      issuer: "ExampleApp",
      audience: "example.com"
    },
    rootUser: {
      id: "root",
      password: "changeit"
    }
  }
};
