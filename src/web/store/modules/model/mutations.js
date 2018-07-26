import router from '@/router';
import auth from '@/auth';

export default {
  loadedModels(state, models) {
    state.list = models;
  },

  loadedModel(state, model) {
    state.model = model;
  },

  loadedAttributes(state, attributes) {
    state.attributes = attributes;
  },

  groupedAttributes(state, groupedAttributes) {
    state.groupedAttributes = groupedAttributes;
  },

  loadedModelType(state, type) {
    state.model_type = type;
  },

  deletedModel(state, id) {
    state.list = _.filter(state.list, m => m.id !== id);
  },

  orderedObjects(state, models) {
    state.list = models
  },
};
