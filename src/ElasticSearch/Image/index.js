import save from "./save";

export default ({ $elastic }) => {
  return {
    save: save({ $elastic })
  };
};
