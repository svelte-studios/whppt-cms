const _ = require('lodash');
const dgraph = require_local('services/dgraph');

module.exports = (id) => {
  return dgraph.query(`
      {
        user(func: eq(id, "${id}"))
         {
            uid
            id
            email
            admin{
              name
              id
              key
            }
            read{
              name
              id
              key
            }
            edit{
              name
              id
              key
            }
            own {
              name
              id
              key
            }
          }
      }
    `).then(results => {

    let projects = _.flatten([
      results.user[0].own || [],
      results.user[0].admin || [],
      results.user[0].read || [],
      results.user[0].edit || []
    ]);
    projects = _.uniqBy(projects, 'id');

    console.log('PROJECTS', projects)
    return projects
  })
};
