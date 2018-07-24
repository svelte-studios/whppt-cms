const _ = require('lodash');

module.exports = (fields) => {

  let isNotDefined = function(val) {
    if (_.isArray(val)) return _.isEmpty(val);
    if (_.isNumber(val)) return (val == undefined || val == null);
    if (_.isString(val)) return (val == '' || val == undefined || val == null);
    return (val == undefined || val.id == 0 || val.id == undefined || val.id == null);
  }

  return (aggregate) => {
    let aggregateName = aggregate.constructor.name;

    return new Promise((resolve, reject) => {
      let required = '';

      _.each(fields, field => {
        if (isNotDefined(aggregate[field])) {
          required += `${field} is required for creating a ${aggregateName}\n`;
        }
      })

      if (required.length > 0)
        return reject(new Error(_.trim(required)));
      resolve();
    });
  }
}
