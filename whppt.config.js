var ElasticDB = require("./src/ElasticSearch").default;

var project = require("./Project");
var elastic_config = require("./Project/elasticsearch");

module.exports = {
  db: ElasticDB(elastic_config),
  projects: [project],
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
