const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');
const _ = require('lodash');


let ImageSetImageType = new GraphQLObjectType({
  name: 'image_set',
  description: 'A set of images',
  fields: {
    url: { type: GraphQLString }
  }
});

module.exports = {
  result: ({ att }) => {
    return {
      type: new GraphQLList(ImageSetImageType),
      resolve(parent, args, context) {
        return parent[att.name];
      }
    }
  }
};
