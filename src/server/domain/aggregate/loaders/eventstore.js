const eventstore_client = require_local('/services/eventstore');

const eventstore_loader = {
  load: ({ aggregate, streamId }) => {
    if (aggregate == undefined) return Promise.resolve();

    let args = {
      streamId: streamId,
      // fromEventNumber: Number(aggregate.version) == -1 ? 0 : Number(aggregate.version)
      fromEventNumber: Number(aggregate.version || 0) + 1
    };

    return eventstore_client.readStreamEventsForward(args)
    .then(response => {
      aggregate.apply(response.events);
      // aggregate.version = response.eventNumber;
      return aggregate;
    });
  }
}

module.exports = eventstore_loader;
