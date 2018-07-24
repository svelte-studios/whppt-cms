// const allRolesQuery = require('../queries/allRoles');
const systemById = require_local('domain/System/queries/byId');
const _ = require('lodash');

module.exports = function(eventData, version) {
  return systemById().then(systemUid => {
    this.mutation = `
    _:user <id> "${eventData.id}" .
    _:user <version> "${version}" .
    _:user <email> "${eventData.email}" .
    _:user <password> "${eventData.password}" .
    <${systemUid}> <user> _:user .
    `;
  })
};
