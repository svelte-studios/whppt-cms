export default ({ $elastic }) => {
  return ({ $project, $type, $idAtt }, { id }) => {
    return new Promise((resolve, reject) => {
      const args = {
        index: $project.id,
        type: $type.single ? "detail" : $type.id,
        id: $type.single ? $type.id : id
      };

      $elastic.get(args, (error, response) => {
        if (
          ((response && response.status === 404) ||
            (response && !response.found)) &&
          $type.single
        ) {
          return resolve({});
        }
        if (error) return reject(error);
        response._source.id = response._source.id || response._id;

        if (!$type.single)
          response._source._name = response._source[$idAtt.name];
        resolve(response._source);
      });
    });
  };
};
