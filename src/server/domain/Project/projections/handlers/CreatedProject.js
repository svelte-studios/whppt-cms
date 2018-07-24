// const allRolesQuery = require('../queries/allRoles');
const queryById = require_local('domain/User/queries/byId');
const querySystem = require_local('domain/System/queries/byId');
const _ = require('lodash');

module.exports = function(eventData, version) {
  return querySystem().then(systemUid => {
    return queryById(eventData.loggedInUser.id).then(user => {
      let userUid = user.uid;
      this.mutation = `
        _:project <id> "${eventData.id}" .
        _:project <version> "${version}" .
        _:project <name> "${eventData.name}" .
        _:project <key> "${eventData.key}" .
        <${userUid}> <own> _:project .
        <${userUid}> <admin> _:project .
        <${userUid}> <read> _:project .
        <${userUid}> <edit> _:project .
         <${systemUid}> <project> _:project .
        `;
    })
  })
};
