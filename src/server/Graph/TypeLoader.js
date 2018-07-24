const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} = require("graphql");
const _ = require("lodash");
const controls = require("./controls");

export default ({ $db }) => {
  return {
    loadQuery: (project, type) => {
      const typeDef = {
        name: type.single ? type.slug.singular : type.slug.plural,
        description: type.single ? type.label.singular : type.label.plural,
        fields: {
          id: { type: GraphQLString }
        }
      };

      _.each(type.attributes, att => {
        if (controls[att.control] && controls[att.control].result)
          typeDef.fields[att.name] = controls[att.control].result({
            type,
            att
          });
      });

      const _type = new GraphQLObjectType(typeDef);
      return {
        type: type.single ? _type : new GraphQLList(_type),
        args: type.single ? undefined : { id: { type: GraphQLString } },
        resolve(parent, args) {
          const _args = { id: args.id, type: type.id, projectId: project.id };
          if (type.single) return $db.Model.byId(_args);
          if (args.id) return [$db.Model.byId(_args)];
          return $db.Model.list(_args);
        }
      };
    },

    loadMutation: (project, type) => {
      const resultTypeDef = {
        name: `updated_${type.slug.singular}`,
        description: type.label.singular,
        fields: {
          id: { type: GraphQLString }
        }
      };
      _.each(type.attributes, att => {
        if (controls[att.control] && controls[att.control].result)
          resultTypeDef.fields[att.name] = controls[att.control].result({
            type,
            att
          });
      });
      const _resultType = new GraphQLObjectType(resultTypeDef);

      const argTypeDef = {
        name: `doc_${type.slug.singular}`,
        description: type.label.singular,
        fields: {
          id: { type: GraphQLString }
        }
      };
      _.each(type.attributes, att => {
        if (controls[att.control] && controls[att.control].arg)
          argTypeDef.fields[att.name] = controls[att.control].arg({
            type,
            att
          });
      });

      const args = {};
      if (!type.single) args.id = { type: new GraphQLNonNull(GraphQLString) };
      args.doc = { type: new GraphQLInputObjectType(argTypeDef) };

      return {
        type: type.single ? _resultType : _resultType,
        args,
        resolve(parent, args) {
          const _args = {
            projectId: project.id,
            type: type.id,
            item: _.assign({ id: args.id }, args.doc)
          };
          return $db.Model.save(_args);
        }
      };
    }
  };
};
