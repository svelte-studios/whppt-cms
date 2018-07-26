export default {
  upload: (project, file) => {
    var formData = new FormData();
    formData.append("project", project);
    formData.append("image_file", file);

    return axios.post(`/api/project/${project}/image`, formData)
      .then(response => response.data);
  },
  clear: (project, file) => {
    var formData = new FormData();
    formData.append("project", project);
    formData.append("image_file", file);

    return axios.post(`/api/project/${project}/image`, formData)
      .then(response => response.data);
  },

};