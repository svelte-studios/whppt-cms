const graphqlHTTP = require("express-graphql");
import Graph from "../Graph";

export default context => {
  const router = context.$JsonRouter();

  const schemas = Graph(context);
  router.post("/graph/:project", (req, res) => {
    graphqlHTTP({
      schema: schemas[req.params.project],
      graphiql: true
    })(req, res);
  });
  router.get("/graph/:project", (req, res) => {
    graphqlHTTP({
      schema: schemas[req.params.project],
      graphiql: true
    })(req, res);
  });

  return router;
};

// router.get(
//   "/api/project/:projectId/type/:type/attributes",
//   sec.authenticate(),
//   sec.authorize.project("projectId", ROLES.READ),
//   (req, res) => {
//     return queryProjectById(req.params.projectId).then(proj => {
//       const project = _.find(projects, {
//         id: proj.key
//       });
//       const type = _.find(project.types, {
//         id: req.params.type
//       });
//
//       return type.attributes;
//     });
//   }
// );

// router.get(
//   "/api/project/:projectId/type/:type",
//   sec.authenticate(),
//   sec.authorize.project("projectId", ROLES.READ),
//   (req, res) => {
//     return queryProjectById(req.params.projectId).then(proj => {
//       const project = _.find(projects, {
//         id: proj.key
//       });
//       const type = _.find(project.types, {
//         id: req.params.type
//       });
//
//       return type;
//     });
//   }
// );
