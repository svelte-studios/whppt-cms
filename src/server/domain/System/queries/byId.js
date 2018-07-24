const _ = require('lodash');
const dgraph = require_local('services/dgraph');

module.exports = () => {
  return dgraph.query(`
      {
        system(func: eq(id, "SystemRoot"))
          {
            uid
          }
      }
    `).then(results => {
    return results.system[0].uid;
  })
};