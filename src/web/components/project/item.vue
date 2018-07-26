<template>
<div id="project_detail" class="main">
  <app-nav></app-nav>
  <div v-if="project" class="content">
    <project-nav :project='project'></project-nav>
    <router-view>
      Some temp content
    </router-view>
  </div>
</div>
</template>

<script>
import appNav from 'Components/nav';
import projectNav from './nav';

export default {
  name: 'project_detail',
  props: ['projectId'],
  components: {
    appNav,
    projectNav
  },
  created: function() {
    this.loadProject(this.projectId);
  },
  methods: Vuex.mapActions('project', ['loadProject']),
  computed: Vuex.mapState('project', ['project'])
};
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
}
.content {
    padding-left: 300px;
    height: 100%;
    padding-top: 60px;

}
</style>
