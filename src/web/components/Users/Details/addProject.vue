<template>
<div class="new_project">
  <div class="content">
    <h3>Add a new Project</h3>
    <div class="form-group">
      <input id="new_project_name"
             type="text"
             class="form-control"
             placeholder="Enter the name of the project"
             v-model="project.name">
    </div>
    <div class="form-group">
      <input id="new_project_key"
             type="text"
             class="form-control"
             placeholder="Enter the key for the project"
             v-model="project.key">
    </div>
    <button id="btn_new_project"
            class="btn btn-primary"
            @click="createProject(project)">Create</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'new_project',
  data() {
    return {
      project: {
        name: '',
        key: ''
      }
    };
  },
  methods: {
    ...Vuex.mapActions('project', ['createProject'])
  }
};
</script>

<style lang="scss" scoped>
.new_project {
    height: 100%;
    display: none;
}
.content {
    padding-top: 40px;
    width: 400px;
    height: 100%;
}
</style>
