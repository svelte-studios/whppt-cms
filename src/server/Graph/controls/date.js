const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');


module.exports = {
  result: ({ att }) => {
    return {
      type: GraphQLString,
      resolve(parent, args, context) {
        console.log('PARENT', parent)
        console.log('ATT.NAME', att.name)
        return parent[att.name];
      }
    }
  },
  arg: ({ att }) => {
    return {
      type: GraphQLString
    }
  }
};
