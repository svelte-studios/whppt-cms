const _ = require('lodash');
const queryByName = require('../queries/byName')

module.exports = () => {

  return (project) => {
    return queryByName(project.name)
      .then(result => {
        if (result != undefined && result.id !== project.id)
          throw new Error(`Name already in use`);
        return `name:${project.name}`;
      })
  }

}