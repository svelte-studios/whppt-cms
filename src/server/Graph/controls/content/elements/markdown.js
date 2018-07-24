const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: `content_markdown`,
  description: 'Markdown in content',
  fields: {
    type: { type: GraphQLString, resolve() { return 'markdown' } },
    value: {
      type: GraphQLString,
      resolve(data) {
        return data.value_markdown
      }
    }
  }
});
