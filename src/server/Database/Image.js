import { find } from "lodash";

export default ({ $projects, $Id }) => {
  const ImageContext = projectId => {
    const $project = find($projects, { id: projectId });
    if (!$project) throw new Error({ message: "Project not found!" });

    return {
      Image: $project.db.Image,
      context: { $project, $Id, projectId }
    };
  };

  return {
    save: ({ projectId, image }) => {
      const { Image, context } = ImageContext(projectId);
      return Image.save(context, { image });
    }
  };
};
