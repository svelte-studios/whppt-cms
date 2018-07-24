const _ = require('lodash');
const shortid = require('shortid');
const Duplicate = require_local('domain/Project/validations/duplicate');
const eventstore_client = require_local('services/eventstore');
// const requiredFields = RequiredFields(['firstname', 'lastname']);
const duplicate = Duplicate();
const projectToDgraphProjection = require_local('domain/Project/projections/toDgraph');

const Project = require('../index');

let validation_rules = [
  // requiredFields,
  duplicate
];

module.exports = {
  handle(projectDetails, user) {

    return Promise.resolve().then(() => {

      let projectId = shortid.generate();
      let project_created_event_data = {
        id: projectId,
        name: projectDetails.name,
        key: projectDetails.key,
        loggedInUser: {
          id: user.account
        }
      };

      let project_events = [{
        eventId: eventstore_client.createGuid(),
        eventType: `CreatedProject`,
        data: project_created_event_data
      }];

      let project = new Project();
      project.apply(project_events);

      let rulesPromise = Promise.resolve();

      _.each(validation_rules, rule => {
        return rulesPromise = rulesPromise.then(() => rule(project));
      });

      return rulesPromise.then(() => {
        return eventstore_client.writeEvents({ streamId: `Project-${projectId}`, events: project_events })
          .then(() => {
            return projectToDgraphProjection(0, `Project-${projectId}`)
              .then(() => project);
          });
      });
    });
  }

}