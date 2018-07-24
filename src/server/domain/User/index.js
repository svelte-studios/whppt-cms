const AggRoot = require('../AggRoot');
const _ = require('lodash');

let UserClass = class User extends AggRoot {

  constructor() {
    super();
  }

  CreatedUser(event) {
    this.id = event.data.id;
    this.email = event.data.email;
    this.password = event.data.password;
  }
}

module.exports = UserClass;
