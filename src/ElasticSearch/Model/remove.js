import { find } from "lodash";

export default ({ $elastic }) => {
  return ({ $project, $type }, { id }) => {
    return $elastic.delete({
      index: $project.id,
      type: $type.id,
      id,
      refresh: true
    });
  };
};
