import model from "./model.router";
import Graph from "./graph.router";

export default context => {
  return [model(context), Graph(context)];
};
