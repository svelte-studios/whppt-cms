const _ = require('lodash');
const shortid = require('shortid');
const Duplicate = require_local('domain/User/validations/duplicate');
const eventstore_client = require_local('services/eventstore');
// const requiredFields = RequiredFields(['firstname', 'lastname']);
const duplicate = Duplicate();
const userToDgraphProjection = require_local('domain/User/projections/toDgraph');

const User = require('../index');

let validation_rules = [
  // requiredFields,
  duplicate
];

module.exports = {
  handle(userDetails) {

    return Promise.resolve().then(() => {

      let userId = shortid.generate();
      let user_created_event_data = {
        id: userId,
        email: userDetails.email,
        password: userDetails.password,
      };

      let user_events = [{
        eventId: eventstore_client.createGuid(),
        eventType: `CreatedUser`,
        data: user_created_event_data
      }];

      let user = new User();
      user.apply(user_events);

      let rulesPromise = Promise.resolve();

      _.each(validation_rules, rule => {
        return rulesPromise = rulesPromise.then(() => rule(user));
      });

      return rulesPromise.then(() => {
        return eventstore_client.writeEvents({ streamId: `User-${userId}`, events: user_events })
        .then(() => {
          return userToDgraphProjection(0, `User-${userId}`)
            .then(() => user);
        });
      });
    });
  }

}
