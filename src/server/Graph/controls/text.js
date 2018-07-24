const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');


module.exports = {
  result: ({ att }) => ({
    type: GraphQLString,
    resolve(parent, args, context) {
      return parent[att.name];
    }
  }),
  arg: ({ att }) => ({
    type: GraphQLString
  })
}
