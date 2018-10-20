import { map, orderBy } from "lodash";

// TODO: Do not limit size on Model list queries
export default ({ $elastic }) => {
  return ({ $project, $type, $idAtt }, { ids }) => {
    if (!ids || ids.length === 0) return Promise.resolve([]);
    return $elastic
      .search({
        index: $project.id,
        type: $type.id,
        body: {
          query: {
            bool: {
              filter: {
                terms: {
                  _id: ids
                }
              }
            }
          }
        },
        size: 4000
      })
      .then(response => {
        const results = map(response.hits.hits, h => {
          h._source.id = h._source.id || h._id;
          h._source._name = h._source[$idAtt.name];
          return h._source;
        });
        return orderBy(results, ["_order"]);
      });
  };
};
