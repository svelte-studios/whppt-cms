const router = require_local('services/json_router')();
const sec = require_local('services/security');
const id = require_local('services/id');
const cloudinary = require('cloudinary');
const _ = require('lodash');
const projects = require_local('services/projects');
const queryProjectById = require_local('domain/Project/queries/byId');
const image_uploader = require_local('services/image_uploader');

const ROLES = sec.ROLES;

router.post('/api/project/:projectId/image',
  sec.authenticate(),
  sec.authorize.project("projectId", ROLES.READ),
  (req, res) => {
    return queryProjectById(req.params.projectId).then(proj => {
      const project = _.find(projects, { id: proj.key });
      if (!project) return reject({ message: 'Project not found!' });
      return image_uploader(project, req.files.image_file)
    });
  });

module.exports = router;