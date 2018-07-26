import actions from './actions';
import mutations from './mutations';

import api from '@/api';

const showList = (state) => {
  return state.list && state.list.length > 0;
  console.log('STATE.LIST', state.list)
};

const showNoList = (state) => {
  return !state.busy && !showList(state);
};

export default {
  namespaced: true,
  state: {
    model: {},
    list: [],
    attributes: [],
    groupedAttributes: {},
    model_type: {}
  },
  actions,
  mutations,
  getters: {
    first: state => _.first(state.list),
    last: state => _.last(state.list),
    showList,
    showNoList
  }
};
