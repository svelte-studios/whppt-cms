const text = require('./text');
const markdown = require('./markdown');
const openHours = require('./openHours');
const image = require('./image');
const imageSet = require('./imageSet');
const content = require('./content');
const date = require('./date');
const select = require('./select');

module.exports = {
  'whppt-text': text,
  'whppt-markdown-preview': markdown,
  'whppt-schedule-open-hours': openHours,
  'whppt-image': image,
  'whppt-image-set': imageSet,
  'whppt-content': content,
  'whppt-date': date,
  'whppt-select': select
}
