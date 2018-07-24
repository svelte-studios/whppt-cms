export default ({ $JsonRouter, $authenticate, $authorise, $db, $ROLES }) => {
  const router = $JsonRouter();

  router.get(
    "/project/:project/type/:type/list",
    $authenticate(),
    $authorise.project("project", $ROLES.READ),
    req => $db.Model.list(req.params.project, req.params.type)
  );

  router.get(
    "/project/:project/type/:type/model/:id",
    $authenticate(),
    $authorise.project("project", $ROLES.READ),
    req => $db.Model.byId(req.params.project, req.params.type, req.params.id)
  );

  router.post(
    "/project/:project/type/:type/model",
    $authenticate(),
    $authorise.project("project", $ROLES.EDIT),
    req => $db.Model.save(req.params.project, req.params.type, req.body)
  );

  router.post(
    "/project/:project/type/:type/model/:id/delete",
    $authenticate(),
    $authorise.project("project", $ROLES.ADMIN),
    req => $db.Model.remove(req.params.project, req.params.type, req.params.id)
  );

  router.post(
    "/project/:project/type/:type/order",
    $authenticate(),
    $authorise.project("project", $ROLES.EDIT),
    req => $db.Model.order(req.params.project, req.params.type, req.body)
  );

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
