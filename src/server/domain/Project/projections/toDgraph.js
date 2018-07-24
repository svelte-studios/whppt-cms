const projectToDgraph = require_local('domain/aggregate/projections/toDgraph');
const handlers = require('./handlers');

module.exports = (streamStartingVersion, streamId) => {
  return projectToDgraph(streamStartingVersion, streamId, handlers);
}
