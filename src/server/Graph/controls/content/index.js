const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
  GraphQLList
} = require('graphql');
const elements = require('./elements');

let ElementType = new GraphQLUnionType({
  name: `content`,
  description: 'Whppt structured content elements',
  types: elements.types,
  resolveType(value) {
    return elements.resolve(value.type) || {};
  }
})

module.exports = {
  result: ({ att }) => {
    return {
      type: new GraphQLList(ElementType),
      resolve(parent, args, context) {
        return parent[att.name].elements;
      }
    }
  }
};
