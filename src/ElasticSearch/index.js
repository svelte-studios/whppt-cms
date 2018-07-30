import Model from "./Model";
import User from "./User";
import Image from "./Image";

const elasticsearch = require("elasticsearch");

export default (config, options) => {
  const elastic_config = JSON.parse(JSON.stringify(config));
  const $elastic = new elasticsearch.Client(elastic_config);

  return {
    User: User({ $elastic, $options: options }),
    Model: Model({ $elastic }),
    Image: Image({ $elastic })
  };
};
