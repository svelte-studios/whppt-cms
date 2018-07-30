import User from "./User";
import Model from "./Model";
import Image from "./Image";

export default context => {
  return {
    User: User(context),
    Model: Model(context),
    Image: Image(context)
  };
};
