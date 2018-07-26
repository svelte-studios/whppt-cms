const _ = require("lodash");
// const projects = require_local("services/projects");
// const createCommand = require_local("domain/Project/commands/create");
// const queryUserProjects = require_local("domain/Project/queries/forUser");
// const queryForLogin = require_local("domain/User/queries/forLogin");
// const queryProjectById = require_local("domain/Project/queries/byId");

export default ({ $JsonRouter, $security, $projects, $db, $ROLES }) => {
  const router = $JsonRouter();

  router.get("/api/projects", $security.authenticate(), req => {
    return Promise.resolve(req.user.projects);
    // queryUserProjects(req.user.account);
  });

  router.get(
    "/api/project/:projectId",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.READ),
    req => {
      return Promise.resolve(
        _.find($projects, p => p.id === req.params.projectId)
      );
      // return queryProjectById(req.params.projectId).then(proj => {
      //   const project = _.find(projects, { id: proj.key });
      //   return {
      //     id: req.params.projectId,
      //     name: project.name,
      //     types: project.types
      //   };
      // });
    }
  );

  // router.post("/api/project", $security.authenticate(), req => {
  //   return createCommand.handle(req.body, req.user).then(project => {
  //     return queryForLogin(req.user.email).then(user => {
  //       const access_token = $security.createAccessToken(user);
  //       return {
  //         project,
  //         creds: {
  //           access_token,
  //           user: { id: user.id, email: user.email }
  //         }
  //       };
  //     });
  //   });
  // });

  return router;
};
