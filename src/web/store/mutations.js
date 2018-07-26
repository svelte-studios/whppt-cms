export default {

  error(state, err) {
    state.error = err.message;
    state.loading = false;
  },

  loadedProjects(state, projects) {
    Vue.set(state, 'projects', projects);
  },

  loadedProject(state, project) {
    console.log('PROJECT', project)
    Vue.set(state, 'project', project);
  },

  loadedObj(state, obj) {
    Vue.set(state, 'object', obj);
  },

  savedObj(state, obj) {
    Vue.set(state, 'object', obj);
  },

  deletedObj(state, objects) {
    Vue.set(state, 'objects', false);
    Vue.set(state, 'objects', objects);
  },

  orderedObjects(state, objects) {
    Vue.set(state, 'objects', false);
    Vue.set(state, 'objects', objects);
  },

  uploadedImage(state, { image_info, att }) {
    Vue.set(state, 'uploaded_image', image_info);
    Vue.set(state.object[att.name], 'id', image_info.id);
    Vue.set(state.object[att.name], 'url', image_info.url);
    Vue.set(state.object[att.name], 'store', image_info.store);
    Vue.set(state.object[att.name], 'meta', image_info.meta);
  },

  addedImage(state, { image_info, att }) {
    Vue.set(state, 'uploaded_image', image_info);
    state.object[att.name] = state.object[att.name] || [];
    state.object[att.name].push(image_info);
  },

  removedImage(state, { att, url }) {
    let image_set = state.object[att.name];
    let original = _.find(image_set, { url: url });
    image_set.splice(image_set.indexOf(original), 1);
  }

}
