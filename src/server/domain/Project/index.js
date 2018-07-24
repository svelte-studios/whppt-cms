const AggRoot = require('../AggRoot');
const _ = require('lodash');

let ProjectClass = class Project extends AggRoot {

  constructor() {
    super();
  }

  CreatedProject(event) {
    this.id = event.data.id;
    this.name = event.data.name;
    this.key = event.data.key;
    this.loggedInUserId = event.data.loggedInUser.id;
  }
}

module.exports = ProjectClass;