import { find, assign } from "lodash";

export default ({ $JsonRouter, $security, $db, $ROLES, $projects }) => {
  const router = $JsonRouter();

  router.get(
    "/api/project/:projectId/type/:type",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.READ),
    req => {
      const project = find($projects, { id: req.params.projectId });
      return Promise.resolve(find(project.types, { id: req.params.type }));
    }
  );

  router.get(
    "/api/project/:projectId/type/:type/attributes",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.READ),
    req => {
      const _project = find($projects, { id: req.params.projectId });
      const _type = find(_project.types, { id: req.params.type });
      return Promise.resolve(_type.attributes);
    }
  );

  router.get(
    "/api/project/:projectId/type/:type/list",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.READ),
    req => {
      return $db.Model.list(req.params);
    }
  );

  router.get(
    "/api/project/:projectId/type/:type/model/:id",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.READ),
    req => $db.Model.byId(req.params)
  );

  router.post(
    "/api/project/:projectId/type/:type/model",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.EDIT),
    req => {
      const args = assign({ item: req.body }, req.params);
      return $db.Model.save(args);
    }
  );

  router.post(
    "/api/project/:projectId/type/:type/model/:id/delete",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.ADMIN),
    req => $db.Model.remove(req.params)
  );

  router.post(
    "/api/project/:projectId/type/:type/order",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.EDIT),
    req => {
      const args = assign({ items: req.body }, req.params);
      return $db.Model.order(args);
    }
  );

  return router;
};
