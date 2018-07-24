const _ = require('lodash');
const queryByEmail = require('../queries/byEmail')

module.exports = () => {

  return (user) => {
    return queryByEmail(user.email)
    .then(result => {
      if (result != undefined && result.id !== user.id)
        throw new Error(`Email already in use`);
      return `email:${user.email}`;
    })
  }

}
