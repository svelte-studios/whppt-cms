import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import api from '@/api';

export default {
  namespaced: true,
  state: {
    signup: { email: '', password: '' },
    user: {}
  },
  actions,
  mutations,
  getters
};