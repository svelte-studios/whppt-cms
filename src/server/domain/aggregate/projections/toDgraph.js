const _ = require('lodash');
const eventstore_client = require_local('services/eventstore');
const dgraph = require_local('services/dgraph');

module.exports = (version, streamId, handlers) => {

  let args = {
    streamId: streamId,
    fromEventNumber: version == -1 ? 0 : version || 0
  };

  return eventstore_client.readStreamEventsForward(args).then(response => {
    let applyEventsPromise = Promise.resolve();
    _.each(response.events, event => {
      applyEventsPromise = applyEventsPromise
        .then(() => handlers[event.eventType](event.data, event.eventNumber))
        .then(() => dgraph.mutate(handlers.mutation))
    });
    return applyEventsPromise;
  })
}
