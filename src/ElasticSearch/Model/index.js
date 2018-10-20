import byId from "./byId";
import remove from "./remove";
import list from "./list";
import order from "./order";
import save from "./save";
import filterByIds from "./filterByIds";

export default ({ $elastic }) => {
  return {
    byId: byId({ $elastic }),
    remove: remove({ $elastic }),
    list: list({ $elastic }),
    filterByIds: filterByIds({ $elastic }),
    order: order({ $elastic }),
    save: save({ $elastic })
  };
};
