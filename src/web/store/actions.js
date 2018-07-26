import api from '@/api';
import router from '../router';
import auth from '../auth';

export default {

  logout() {
    auth.logout();
    router.push('/login');
  },

  loadProjects({ commit, state }) {
    state.loading = true;
    return api.project.list()
      .then(projects => commit('loadedProjects', projects))
      .then(() => {
        state.error = false;
        state.loading = false;
      })
      .catch(err => {
        state.error = err.message;
        state.loading = false;
      });
  },

  loadProject({ commit, state }, id) {
    state.loading = true;
    return api.project.load(id)
      .then(project => commit('loadedProject', project))
      .then(() => {
        state.error = false;
        state.loading = false;
      })
      .catch(err => {
        state.error = err.message;
        state.loading = false;
      });
  },

  moveUp({ commit, state }, { project, type, obj }) {
    let itemIndex = state.objects.indexOf(obj);
    let newOrder = _.reduce(state.objects, (m, o, i) => {
      if (i == itemIndex) return m;

      if (i == itemIndex - 1) {
        m.push(obj.id);
        m.push(o.id);
        return m;
      }

      m.push(o.id);
      return m;
    }, []);
    return api.obj.order(project, type, newOrder)
      .then(() => api.obj.list(project, type))
      .then(objects => commit('orderedObjects', objects))
      .catch(err => {
        state.error = err.message;
      });
  },

  moveDown({ commit, state }, { project, type, obj }) {
    let itemIndex = state.objects.indexOf(obj);
    let newOrder = _.reduce(state.objects, (m, o, i) => {
      if (i == itemIndex) return m;

      if (i == itemIndex + 1) {
        m.push(o.id);
        m.push(obj.id);
        return m;
      }

      m.push(o.id);
      return m;
    }, []);
    return api.obj.order(project, type, newOrder)
      .then(() => api.obj.list(project, type))
      .then(objects => commit('orderedObjects', objects))
      .catch(err => {
        state.error = err.message;
      });
  },



  deleteObj({ commit, state }, { project, type, id }) {
    state.busy = true;
    return api.obj.delete(project, type, id)
      .then(() => api.obj.list(project, type))
      .then(objects => commit('deletedObj', objects))
      .then(() => {
        state.busy = false;
        state.error = false;
      })
      .catch(err => {
        state.busy = false;
        state.error = err;
      });
  },

  uploadImage({ commit, state }, { att, file }) {
    let project = state.project.id;

    return api.image.upload(project, file)
      .then(image_info => {
        commit('uploadedImage', { image_info, att });
        return image_info;
      });
  },

  addImage({ commit, state }, { att, file }) {
    let project = state.project.id;

    return api.image.upload(project, file)
      .then(image_info => {
        commit('addedImage', { image_info, att });
      });
  },

  removeImage({ commit, state }, { att, url }) {
    commit('removedImage', { att, url });
    return Promise.resolve();
  },

  saveObj({ commit, state }, { project, type, obj }) {
    return api.obj.save(project, type, obj)
      .then(id => router.push(`/project/${project}/type/${type}/object/${id}`));
  }
  // ,
  //
  // 'core-input-text-change'({ commit }, value) {
  //   commit('core-input-text-changed', value);
  // }

}

// const moveObj = ({ commit, state }, { project, type, obj, step }) => {
//   let itemIndex = state.objects.indexOf(obj);
//   let newOrder = _.reduce(state.objects, (m, o, i) => {
//     if (i == itemIndex) return m;
//
//     console.log('STEP', step)
//     if (i == itemIndex + step) {
//       m.push(obj.id);
//       m.push(o.id);
//       return m;
//     }
//
//     m.push(o.id);
//     return m;
//   }, []);
//   return api.obj.order(project, type, newOrder)
//     .then(() => api.obj.list(project, type))
//     .then(objects => commit('orderedObjects', objects))
//     .catch(err => {
//       state.error = err.message;
//     });
// };
