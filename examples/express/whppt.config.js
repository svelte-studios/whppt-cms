var ElasticDB = require("whppt/ElasticDB").default;

var project = require("./project");
var elastic_config = require("./project/elasticsearch");

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
