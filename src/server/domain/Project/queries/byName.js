const _ = require('lodash');
const dgraph = require_local('services/dgraph');


module.exports = (name) => {
  return dgraph.query(`
      {
        project(func: eq(name, "${name}"))
         {
            uid
            id
            name
          }
      }
    `).then(results => {
    return results.project[0]
  })
};