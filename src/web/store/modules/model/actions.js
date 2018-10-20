import api from "@/api";

export default {
  loadModels({ commit, state }, { projectId, type }) {
    state.loading = true;
    return api.obj
      .list(projectId, type)
      .then(models => commit("loadedModels", models));
  },

  loadModel({ commit, state }, { projectId, type, id }) {
    if (id === "new") {
      const model = {};
      return commit("loadedModel", ensureAttributes(model, state.attributes));
    }

    return axios
      .get(`/api/project/${projectId}/type/${type}/model/${id}`)
      .then(response => {
        const model = ensureAttributes(response.data, state.attributes);
        commit("loadedModel", model);
        return model;
      });
  },

  loadModelType({ commit }, { projectId, type }) {
    return axios
      .get(`/api/project/${projectId}/type/${type}`)
      .then(response => commit("loadedModelType", response.data));
  },

  loadAttributes({ commit }, { projectId, type }) {
    return axios
      .get(`/api/project/${projectId}/type/${type}/attributes`)
      .then(response => {
        const groupedAttributes = _.groupBy(
          response.data,
          a => a.tab || "General"
        );
        commit("loadedAttributes", response.data);
        commit("groupedAttributes", groupedAttributes);
      });
  },

  save({ state }, { projectId, type, doc }) {
    doc = doc || state.model;
    return axios
      .post(`/api/project/${projectId}/type/${type}/model`, doc)
      .then(response => {
        return response.data;
      });
  },

  deleteModel({ commit, state, rootState }, { projectId, type, id }) {
    //TODO: need this to be checked by the components.
    const _type = _.find(rootState.project.project.types, t => t.id === type);
    const attsWithOtherTypes = _.filter(
      _type.attributes,
      att => att.control === "whppt-ordered-type-list"
    );
    return axios
      .get(`/api/project/${projectId}/type/${type}/attributes`)
      .then(_attributes => {
        return axios
          .get(`/api/project/${projectId}/type/${type}/model/${id}`)
          .then(__model => {
            const _model = ensureAttributes(__model.data, _attributes.data);
            const hasOtherTypes = _.find(attsWithOtherTypes, att => {
              const attValue = _model[att.name];
              return attValue && attValue.length > 0;
            });

            if (hasOtherTypes)
              return Promise.reject(
                "Cannot remove, related items need to be removed first."
              );

            return axios
              .post(`/api/project/${projectId}/type/${type}/model/${id}/delete`)
              .then(() => {
                const withoutDeletingModel = _.filter(
                  state.list,
                  model => model.id != id
                );
                const newOrder = _.map(withoutDeletingModel, model => model.id);
                axios.post(
                  `/api/project/${projectId}/type/${type}/order`,
                  newOrder
                );
              })
              .then(() => commit("deletedModel", id));
          });
      });
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
    const newOrder = _.map(value, v => v.id);
    _.each(value, (v, index) => {
      v._order = index;
    });

    return api.obj
      .order(projectId, type, newOrder)
      .then(() => commit("orderedObjects", value))
      .catch(err => {
        state.error = err.message;
      });
  }
};

const ensureAttributes = function(model, attributes) {
  const m = { id: model.id };
  _.each(attributes, a => {
    m[a.name] = model[a.name];
  });
  m._order = model._order;
  return m;
};
