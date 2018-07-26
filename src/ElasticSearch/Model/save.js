import { find } from "lodash";

export default ({ $elastic }) => {
  const getNextOrderNumber = (project, type) => {
    return $elastic
      .count({ index: project.id, type: type.id })
      .then(response => response.count + 1)
      .catch(() => 1);
  };

  return ({ $project, $type, $Id }, { item }) => {
    return getNextOrderNumber($project, $type).then(order => {
      item._order = item._order || order;

      const _id = item.id || $Id();
      const args = {
        index: $project.id,
        type: $type.single ? "detail" : $type.id,
        id: $type.single ? $type.id : _id,
        body: item
      };

      return $elastic.exists(args).then(exists => {
        if (exists) {
          args.body = { doc: args.body };
          return $elastic.update(args).then(response => {
            if (response.error) throw new Error(response.error);
            return $type.single ? "detail" : _id;
          });
        }
        return $elastic.index(args).then(response => {
          if (response.error) throw new Error(response.error);
          return $type.single ? "detail" : _id;
        });
      });
    });
  };
};
