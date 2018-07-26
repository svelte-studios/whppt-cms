import api from '@/api';
import router from '@/router';

export default {
  createProject({ commit }, project) {
    return axios.post(`/api/project`, project)
      .then(result => {
        commit('security/loggedIn', result.data.creds, { root: true })
        commit('createdProject', result.data.project);
      })
  },

  loadProjects({ commit }) {
    return axios.get(`/api/projects`)
      .then(result => commit('loadedProjects', result.data))
  },

  loadProject({ commit }, id) {
    if (!id) return router.push('/projects');

    return axios.get(`/api/project/${id}`)
      .then(result => commit('loadedProject', result.data))
  }
};
