const cloudinary_uploader = require('./cloudinary');
const development_uploader = require('./development');

module.exports = (project, filedata) => {
  if (process.env.NODE_ENV == "development")
    return development_uploader(project, filedata);
  return cloudinary_uploader(project, filedata);
}