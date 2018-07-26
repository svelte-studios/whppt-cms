<template>
<div class="user_details">
  <app-nav></app-nav>
  <div class="content">
    <div class="user_header">
      <h2>User Details</h2>
    </div>
    <div>
      <p>
        Id: {{user.id}}
      </p>
      <p :value="user.email"
         id="user_email">
        Email: {{user.email}}
      </p>
    </div>
    <add-project></add-project>
    <project-list :id='id'></project-list>

  </div>
</div>
</template>

<script>
import appNav from '@/components/nav';
import addProject from './addProject';
import projectList from './projectList';

export default {
  name: 'user_details',
  props: ['id'],
  components: {
    appNav,
    addProject,
    projectList
  },
  created() {
    return this.loadUserDetails()
  },
  computed: Vuex.mapState('user', ['user']),
  methods: Vuex.mapActions('user', ['loadUserDetails'])
};
</script>

<style lang="scss" scoped>
.user_details {
    height: 100%;
}
.content {
    padding-top: 60px;
    padding-left: 300px;
    height: 100%;
}
</style>
