const cloudinary = require("cloudinary");

export default () => {
  return ({ $project }, { file }) => {
    return new Promise((resolve, reject) => {
      const img_options = {
        cloud_name: $project.cloudinary.cloud_name,
        api_key: $project.cloudinary.api_key,
        api_secret: $project.cloudinary.api_secret,
        // public_id: 'sample_id',
        // crop: 'limit',
        // width: 2000,
        // height: 2000,
        // eager: [
        //   { width: 200, height: 200, crop: 'thumb', gravity: 'face',
        //     radius: 20, effect: 'sepia' },
        //   { width: 100, height: 150, crop: 'fit', format: 'png' }
        // ],
        tags: [`project:${$project.key}`, `projectId:${$project.id}`]
      };

      cloudinary.uploader
        .upload_stream(result => {
          if (result.error) return reject(result.error);

          if (!result.public_id || !result.url)
            return reject(new Error("Missing public_id or url"));

          resolve({
            store: "cloudinary",
            meta: result,
            url: result.url,
            secure_url: result.secure_url
          });
        }, img_options)

        .end(file.data);
    });
  };
};
