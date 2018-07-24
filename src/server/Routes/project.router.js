const _ = require('lodash');
const router = require_local('services/json_router')();
const sec = require_local('services/security');
const projects = require_local('services/projects');
const createCommand = require_local('domain/Project/commands/create');
const queryUserProjects = require_local('domain/Project/queries/forUser');
const queryForLogin = require_local('domain/User/queries/forLogin');
const queryProjectById = require_local('domain/Project/queries/byId');

const ROLES = sec.ROLES;

router.get('/api/projects',
  sec.authenticate(),
  function(req) {
    return queryUserProjects(req.user.account);
  });

router.get('/api/project/:projectId',
  sec.authenticate(),
  sec.authorize.project("projectId", ROLES.READ),
  function(req) {
    return queryProjectById(req.params.projectId).then(proj => {
      const project = _.find(projects, { id: proj.key });
      return {
        id: req.params.projectId,
        name: project.name,
        types: project.types
      };

    })
  });


router.post('/api/project', sec.authenticate(), function(req) {
  return createCommand.handle(req.body, req.user).then(project => {
    return queryForLogin(req.user.email).then(user => {
      let access_token = sec.createAccessToken(user);
      return {
        project,
        creds: {
          access_token,
          user: { id: user.id, email: user.email }
        }
      }
    })
  });
});

module.exports = router;
