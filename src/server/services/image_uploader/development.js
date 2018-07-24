module.exports = (project, file) => {
  return Promise.resolve({
    store: 'development_testing',
    id: 'fake_id',
    url: `static/images/${file.name}`,
    meta: {}
  });
}
