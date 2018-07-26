import router from '@/router';

export default {
  // signedup(state, details) {
  //   localStorage.setItem('id_token', details.result);
  //   localStorage.setItem('access_token', details.access_token);
  //   state.user = details.result
  //   return axios.get('/sessions/test').then(() => {
  //     auth.user.authenticated = true;
  //     router.push('/projects');
  //   });
  // },
  // error(state, err) {
  //   state.error = err;
  // },

  loggedIn(state, details) {
    console.log('DETAILS', details)
    localStorage.setItem('access_token', details.access_token);
    localStorage.setItem('user', JSON.stringify(details.user));
    router.push('/projects');
  },
  error(state, err) {
    state.error = err;
  }
};
