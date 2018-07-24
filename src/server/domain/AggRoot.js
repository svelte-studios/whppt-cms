const _ = require('lodash');

module.exports = class AggRoot {

  constructor() {
    this.version = -1;
  };

  init(values) {
    _.assign(this, values || {});
  };

  apply(events) {
    _.each(events, event => {
      this[event.eventType](event)
      this.version = event.eventNumber;
    });
  };

}
