import api from '@/api';
import router from '@/router';

export default {
  loadModels({ commit, state }, { projectId, type }) {
    state.loading = true;
    return api.obj.list(projectId, type)
      .then(models => commit('loadedModels', models));
  },

  loadModel({ commit, state }, { projectId, type, id }) {
    if (id === 'new') {
      let model = {};
      return commit('loadedModel', ensureAttributes(model, state.attributes))
    };

    return axios.get(`/api/project/${projectId}/type/${type}/model/${id}`)
      .then(response => {
        let model = ensureAttributes(response.data, state.attributes);
        commit('loadedModel', model);
      });
  },

  loadModelType({ commit }, { projectId, type }) {
    return axios.get(`/api/project/${projectId}/type/${type}`)
      .then(response => commit('loadedModelType', response.data));
  },

  loadAttributes({ commit }, { projectId, type }) {
    return axios.get(`/api/project/${projectId}/type/${type}/attributes`)
      .then(response => {
        let groupedAttributes = _.groupBy(response.data, a => a.tab || 'General');
        commit('loadedAttributes', response.data);
        commit('groupedAttributes', groupedAttributes);
      });
  },

  save({ commit, state }, { projectId, type }) {
    return axios.post(`/api/project/${projectId}/type/${type}/model`, state.model)
      .then(response => { return response.data; })
      .then(id => router.push(`/project/${projectId}/type/${type}/model/${id}`));
  },

  deleteModel({ commit, state }, { projectId, type, id }) {
    return axios.post(`/api/project/${projectId}/type/${type}/model/${id}/delete`)
      .then(() => {
        let withoutDeletingModel = _.filter(state.list, model => model.id != id);
        let newOrder = _.map(withoutDeletingModel, model => model.id);
        axios.post(`/api/project/${projectId}/type/${type}/order`, newOrder);
      })
      .then(() => commit("deletedModel", id))
  },

  // moveUp({ commit, state }, { projectId, type, id }) {
  //   let modelUp = id;
  //   let modelUpIndex = state.list.indexOf(modelUp);
  //   let newOrder = _.reduce(state.list, (result, model, modelIndex) => {
  //     if (modelIndex == modelUpIndex) return result;
  //
  //     if (modelIndex == modelUpIndex - 1) {
  //       result.push(modelUp.id);
  //       result.push(model.id);
  //       return result;
  //     }
  //
  //     result.push(model.id);
  //     return result;
  //   }, []);
  //   return api.obj.order(projectId, type, newOrder)
  //     .then(() => api.obj.list(projectId, type))
  //     .then(list => commit('orderedObjects', list))
  //     .catch(err => {
  //       state.error = err.message;
  //     });
  // },
  //
  // moveDown({ commit, state }, { projectId, type, id }) {
  //   let modelDown = id;
  //   let modelDownIndex = state.list.indexOf(modelDown);
  //   let newOrder = _.reduce(state.list, (result, model, modelIndex) => {
  //     if (modelIndex == modelDownIndex) return result;
  //
  //     if (modelIndex == modelDownIndex + 1) {
  //       result.push(model.id);
  //       result.push(modelDown.id);
  //       return result;
  //     }
  //
  //     result.push(model.id);
  //     return result;
  //   }, []);
  //   return api.obj.order(projectId, type, newOrder)
  //     .then(() => api.obj.list(projectId, type))
  //     .then(list => commit('orderedObjects', list))
  //     .catch(err => {
  //       state.error = err.message;
  //     });
  // },

  reOrder({ commit, state }, { projectId, type, value }) {
    let newOrder = _.map(value, v => v.id);
    _.each(value, (v, index) => {
      v._order = index
    });

    return api.obj.order(projectId, type, newOrder)
      .then(() => commit('orderedObjects', value))
      .catch(err => {
        state.error = err.message;
      });
  }

};

let ensureAttributes = function(model, attributes) {
  let m = { id: model.id };
  _.each(attributes, a => {
    m[a.name] = model[a.name];
  })
  m._order = model._order;
  return m;
};
