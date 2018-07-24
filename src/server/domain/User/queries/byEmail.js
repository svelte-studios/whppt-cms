const _ = require('lodash');
const dgraph = require_local('services/dgraph');


module.exports = (email) => {
  return dgraph.query(`
      {
        user(func: eq(email, "${email}"))
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
            projects: project {
              name
              id
              key
            }
          }
      }
    `).then(results => {
    return results.user[0]
  })
};