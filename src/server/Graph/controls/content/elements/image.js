const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: `content_image`,
  description: 'Image in content',
  fields: {
    type: { type: GraphQLString, resolve() { return 'image' } },
    url: {
      type: GraphQLString,
      resolve(data) {
        console.log('DATA', data)
        return data.value_image.url;
      }
    }
  }
});
