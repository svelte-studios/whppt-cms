const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const _ = require("lodash");

import ProjectLoader from "./ProjectLoader";
const authenticate = require("./authenticate");

export default ({ $projects, $createAccessToken, $db, $decodeAccessToken }) => {
  const projectLoader = ProjectLoader({ $decodeAccessToken, $db });

  const schemas = {};
  _.each($projects, project => {
    const queryDef = {
      name: "Whppt_Query",
      fields: {}
    };
    queryDef.fields[project.id] = projectLoader.loadQueries(project);

    const mutationDef = {
      name: "Whppt_Mutations",
      fields: {
        authenticate: authenticate({ $createAccessToken, $db })
      }
    };
    mutationDef.fields[project.id] = projectLoader.loadMutations(project);

    const schemaDef = {
      query: new GraphQLObjectType(queryDef),
      mutation: new GraphQLObjectType(mutationDef)
    };
    schemas[project.id] = new GraphQLSchema(schemaDef);
  });
  return schemas;
};
