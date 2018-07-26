
export default {
  list: () => {
    return axios.get('/api/projects')
      .then(response => response.data);
  },

  load: id => {
    return axios.get(`/api/project/${id}`)
      .then(response => response.data);
  }
};
