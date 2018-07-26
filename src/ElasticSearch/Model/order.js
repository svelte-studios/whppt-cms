import { find, reduce } from "lodash";

export default ({ $elastic }) => {
  return ({ $project, $type }, { items }) => {
    return Promise.resolve().then(() => {
      const updates = reduce(
        items,
        (body, item, index) => {
          body.push({ update: { _id: item } });
          body.push({ doc: { _order: index } });
          return body;
        },
        []
      );

      return $elastic.bulk({
        index: $project.id,
        type: $type.id,
        body: updates,
        refresh: "true"
      });
    });
  };
};
