export default () => {
  return (__, { file }) => {
    return Promise.resolve({
      store: "development_testing",
      url: `static/images/${file.name}`,
      meta: {}
    });
  };
};
