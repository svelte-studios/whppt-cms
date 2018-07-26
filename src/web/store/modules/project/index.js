import actions from './actions';
import mutations from './mutations';

import api from '@/api';

export default {
  namespaced: true,
  state: {
    project: {},
    list: []
  },
  actions,
  mutations
};