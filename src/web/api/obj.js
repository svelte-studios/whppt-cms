export default {
  list: (project, type) => {
    return axios
      .get(`/api/project/${project}/type/${type}/list`)
      .then(response => response.data);
  },

  load(project, type, id) {
    if (type === "detail")
      return axios
        .get(`/api/project/${project}/detail/${id}`)
        .then(response => response.data);

    return axios
      .get(`/api/project/${project}/type/${type}/object/${id}`)
      .then(response => response.data);
  },

  delete(project, type, id) {
    return axios.post(`/api/project/${project}/type/${type}/delete/${id}`);
  },

  order(project, type, order) {
    return axios.post(`/api/project/${project}/type/${type}/order`, order);
  },

  filterByIds: (project, type, ids) => {
    return axios
      .post(`/api/project/${project}/type/${type}/filterByIds`, ids)
      .then(response => response.data);
  }
};
