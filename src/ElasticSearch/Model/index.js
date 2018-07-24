import byId from "./byId";
import remove from "./remove";
import list from "./list";
import order from "./order";
import save from "./save";

export default ({ $elastic }) => {
  return {
    byId: byId({ $elastic }),
    remove: remove({ $elastic }),
    list: list({ $elastic }),
    order: order({ $elastic }),
    save: save({ $elastic })
  };
};
