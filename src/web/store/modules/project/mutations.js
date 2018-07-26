import router from '@/router';
import auth from '@/auth';

export default {

  createdProject(state, result) {
    state.list.push(result)
    router.push(`/project/${result.id}`)
  },

  loadedProjects(state, result) {
    state.list = result;
  },

  loadedProject(state, result) {
    state.project = result;
  }

};
