import Model from "./Model";
import User from "./User";
import Image from "./Image";

const elasticsearch = require("elasticsearch");
const elasticsearchaws = require("aws-elasticsearch-client");

export default (config, options) => {
  const elastic_config = JSON.parse(JSON.stringify(config));
  let $elastic = new elasticsearch.Client(elastic_config);
  if (config.aws) $elastic = new elasticsearchaws(elastic_config);

  return {
    User: User({ $elastic, $options: options }),
    Model: Model({ $elastic }),
    Image: Image({ $elastic })
  };
};
