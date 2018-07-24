const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

let ContentType = new GraphQLObjectType({
  name: `image`,
  description: '',
  fields: {
    url: { type: GraphQLString }
  }
})

module.exports = {
  result: ({ att }) => {
    return {
      type: ContentType,
      resolve(parent, args, context) {
        return parent[att.name];
      }
    }
  }
};
