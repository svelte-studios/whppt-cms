const cloudinary = require('cloudinary');
const _ = require('lodash');
const id = require_local('services/id');

module.exports = (project, file) => {
  return new Promise((resolve, reject) => {
    let img_options = {
      cloud_name: project.cloudinary.cloud_name,
      api_key: project.cloudinary.api_key,
      api_secret: project.cloudinary.api_secret,
      // public_id: 'sample_id',
      // crop: 'limit',
      // width: 2000,
      // height: 2000,
      // eager: [
      //   { width: 200, height: 200, crop: 'thumb', gravity: 'face',
      //     radius: 20, effect: 'sepia' },
      //   { width: 100, height: 150, crop: 'fit', format: 'png' }
      // ],
      tags: [
        `project:${project.key}`,
      ]
    };

    cloudinary.uploader

      .upload_stream(result => {
        if (result.error) return reject(result.error);

        if (!result.public_id || !result.url)
          return reject(new Error('Missing public_id or url'));

        let image = {
          index: _.toLower(project.id),
          type: 'images',
          id: id(),
          body: {
            store: 'cloudinary',
            cloudinary: result
          }
        };

        project.elastic.index(image, function(error, response) {
          if (error) return reject(error);
          resolve({
            store: image.body.store,
            id: image.id,
            url: image.body.cloudinary.url,
            meta: result
          });
        });

      }, img_options)

      .end(file.data);
  });
}