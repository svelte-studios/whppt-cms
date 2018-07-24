const _ = require('lodash');
const dgraph = require_local('services/dgraph');
const User = require_local('domain/User');
const aggLoader = require_local('domain/aggregate/loaders/eventstore');


module.exports = (id) => {
  return dgraph.query(`
      {
        user(func: eq(id, "${id}"))
         {
            uid
            id
            key
          }
      }
    `).then(results => {
    return results.user[0]
  })
};