import User from "./User";
import Model from "./Model";

export default context => {
  return {
    User: User(context),
    Model: Model(context)
  };
};
