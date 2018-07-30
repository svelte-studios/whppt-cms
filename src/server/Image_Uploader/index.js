import { find } from "lodash";

import Cloudinary_Uploader from "./Cloudinary";
import Local_Uploader from "./Local";

export default ({ $projects }) => {
  return (projectId, file) => {
    const $project = find($projects, { id: projectId });
    if (!$project) throw new Error("Project not found!");

    const Uploader =
      process.env.WHPPT_ENV === "development"
        ? Local_Uploader()
        : Cloudinary_Uploader();

    return Uploader({ $project }, { file });
  };
};
