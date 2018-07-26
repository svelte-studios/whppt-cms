import api from '@/api';

export default {
  // loadUser({ commit }, { user }) {
    //   return axios.get(`/api/user/${user.id}`)
    //     .then(result => {
    //       commit('loadUser', result.data)
    //     })
    // },

  loadUserDetails({ commit }, id) {
    return axios.get(`/api/user`)
      .then(result => {
        commit('loadUserDetails', result.data)
      })
  }
};
