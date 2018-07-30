import { find, toLower } from "lodash";

export default ({ $elastic }) => {
  return ({ $project, $Id }, { image }) => {
    console.log("IMAGE", image);
    const _id = $Id();
    const args = {
      index: toLower($project.id),
      type: "images",
      id: _id,
      body: image
    };

    return $elastic.index(args).then(response => {
      if (response.error) throw new Error(response.error);
      return { id: _id };
    });
  };
};
