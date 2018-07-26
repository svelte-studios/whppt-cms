<template>
<div class="project_list">
  <div class="content collection with-header">
    <h3 class="collection-header">List of Your Projects</h3>
    <div class="form-group">
      <div v-for="project in list" :id="project.key">
        <div class="collection-item">
          <div class="row">
            <span class='name col s2'>
              <div class="right">Name:</div>
            </span>
            <span class="col s10">{{project.name}}</span>
            <span class='id col s2'>
              <div class="right">Id:</div>
            </span>
            <span class="col s10">{{project.id}}</span>
            <span class='key col s2'>
              <div class="right">Key:</div>
            </span>
            <span class="col s10">{{project.key}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'project_list',
  props: ['id'],
  data() {
    return {
      projectName: ''
    };
  },
  created() {
    let vm = this;
    return vm.loadUserProjects(vm.id)
  },
  methods: {
    ...Vuex.mapActions('project', ['createProject']),
    ...Vuex.mapActions('project', ['loadUserProjects'])
  },
  computed: {
    ...Vuex.mapState('project', ['list'])
  },
};
</script>

<style lang="scss" scoped>
.project_list {
    height: 100%;
}
.content {
    margin-top: 40px;
    width: 400px;
    height: 100%;
}
</style>
