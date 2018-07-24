const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const _ = require("lodash");
import TypeDefLoader from "./TypeLoader";

export default ({ $decodeAccessToken, $db }) => {
  const typeDefLoader = TypeDefLoader({ $db });

  return {
    loadQueries: projectConfig => {
      const projectDef = {
        name: projectConfig.id,
        description: `Whppt project: ${projectConfig.name}`,
        fields: {
          name: {
            type: GraphQLString,
            resolve() {
              return projectDef.name;
            }
          }
        }
      };

      _.each(projectConfig.types, type => {
        projectDef.fields[type.id] = typeDefLoader.loadQuery(
          projectConfig,
          type
        );
      });

      const ProjectType = new GraphQLObjectType(projectDef);
      return {
        type: ProjectType,
        args: { token: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parent, args) {
          if (!args.token) throw new Error("Missing authentication token");
          return $decodeAccessToken(args.token).then(token => {
            if (!_.find(token.scope.projects, p => p.id === projectConfig.id))
              throw new Error(
                "Could not authenticate with the provided token."
              );
            return token;
          });
        }
      };
    },

    loadMutations: projectConfig => {
      const projectDef = {
        name: `${projectConfig.id}_mutations`,
        description: `Whppt project: ${projectConfig.name}`,
        fields: {
          name: {
            type: GraphQLString,
            resolve() {
              return projectDef.name;
            }
          }
        }
      };

      _.each(projectConfig.types, type => {
        projectDef.fields[type.id] = typeDefLoader.loadMutation(
          projectConfig,
          type
        );
      });

      const ProjectType = new GraphQLObjectType(projectDef);
      return {
        type: ProjectType,
        args: { token: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parent, args) {
          if (!args.token) throw new Error("Missing authentication token");
          return $decodeAccessToken(args.token).then(token => {
            if (!_.find(token.scope.projects, p => p.id === projectConfig.id))
              throw new Error(
                "Could not authenticate with the provided token."
              );
            return token;
          });
        }
      };
    }
  };
};
