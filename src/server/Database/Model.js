import { find } from "lodash";

export default ({ $projects, $Id }) => {
  const ModelContext = (projectId, type) => {
    const $project = find($projects, { id: projectId });
    const $type = find($project.types, { id: type });
    const $idAtt = find($type.attributes, { id: true });
    return {
      Model: $project.db.Model,
      context: { $project, $type, $idAtt, $Id, projectId, type }
    };
  };

  return {
    byId: ({ projectId, type, id }) => {
      const { Model, context } = ModelContext(projectId, type);
      return Model.byId(context, { id });
    },
    list: ({ projectId, type }) => {
      const { Model, context } = ModelContext(projectId, type);
      return Model.list(context);
    },
    save: ({ projectId, type, item }) => {
      const { Model, context } = ModelContext(projectId, type);
      return Model.save(context, { item });
    },
    order: ({ projectId, type, items }) => {
      const { Model, context } = ModelContext(projectId, type);
      return Model.order(context, { items });
    },
    remove: ({ projectId, type, id }) => {
      const { Model, context } = ModelContext(projectId, type);
      return Model.remove(context, { id });
    }
  };
};
