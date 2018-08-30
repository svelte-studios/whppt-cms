const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const ContentType = new GraphQLObjectType({
  name: 'select',
  fields: {
    label: {type: GraphQLString},
    value: {type: GraphQLString}
  }
})

module.exports = {
  result: ({att}) => {
    return {
      type: ContentType,
      resolve(parent) {
        return parent[att.name]
      }
    }
  }
}
