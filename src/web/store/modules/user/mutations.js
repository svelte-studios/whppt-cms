import router from '@/router';
import auth from '@/auth';

export default {

  // loadUser(state, user) {
  //   state.user = user;
  //   router.push(`/user/${user.id}`);
  // },

  loadUserDetails(state, user) {
    state.user = user;
  }
};
