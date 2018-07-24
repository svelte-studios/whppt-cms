const image = require('./image');
const markdown = require('./markdown');
const header = require('./header');

const mappings = {
  'whppt-image': image,
  'whppt-markdown': markdown,
  'whppt-content-header': header
}

module.exports = {
  types: [image, markdown, header],
  resolve(type) {
    return mappings[type]
  }
}
