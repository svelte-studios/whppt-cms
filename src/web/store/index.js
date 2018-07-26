import actions from './actions';
import mutations from './mutations';
import security from './modules/security';
import user from './modules/user';
import project from './modules/project';
import model from './modules/model';

const store = new Vuex.Store({
  state: {
    authenticated: false,
    objects: false,
    object: false,
    uploaded_image: false,
    error: false,
    loading: false,
    busy: false,
  },
  actions,
  mutations,
  modules: {
    security,
    user,
    project,
    model
  }
});

export default store;
