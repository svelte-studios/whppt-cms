const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

// const queryForLogin = require("../domain/User/queries/forLogin");

const AuthenticatedResultType = new GraphQLObjectType({
  name: `Authenticated_Result`,
  fields: {
    token: { type: GraphQLString }
  }
});

module.exports = ({ $createAccessToken, $db }) => {
  return {
    type: AuthenticatedResultType,
    description: "Get an authenticated token for use with the graph",
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (value, creds) => {
      return $db.User.forLogin({
        email: creds.email,
        password: creds.password
      }).then(user => {
        const token = $createAccessToken(user, 1);
        return { token };
      });
    }
  };
};
