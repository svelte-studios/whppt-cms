<template>
<div class="main">
  <app-nav></app-nav>
  <div class="row">
    <div class="col s12">
      <a v-for="proj in list">
        <div class="row">
          <div class="col s6 offset-s3">
            <router-link :to="{ name: 'project', params: { projectId: proj.id} }" class="card-panel blue white-text center" style="display: block">
              {{ proj.name }}
            </router-link>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import appNav from '@/components/nav';

export default {
  name: 'app',
  components: {
    appNav,
  },
  created() {
    return this.loadProjects()
  },
  methods: Vuex.mapActions('project', ['loadProjects']),
  computed: Vuex.mapState('project', ['list'])
};
</script>

<style lang="scss" scoped>
.main {
    padding-top: 100px;
    height: 100%;
}
// .content {
//     padding-top: 60px;
//     // padding-left: 300px;
//     height: 100%;
// }
</style>
