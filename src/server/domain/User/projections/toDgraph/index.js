const projectToDgraph = require_local('domain/aggregate/projections/toDgraph');
const CreatedUser = require('./CreatedUser');

const handlers = {
  mutation: '',
  CreatedUser
};

module.exports = (streamStartingVersion, streamId) => {
  return projectToDgraph(streamStartingVersion, streamId, handlers);
}
