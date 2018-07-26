<template>
<div id="app-header">
  <div class="container">
    <div class="row">
      <div class="col">{{project}}</div>
      <div class="col user_menus">
        <a id="nav_logout"
           href="/"
           @click="logout()">Log Out</a>
        <!-- <router-link id="nav_me" :to="{ name: 'me' }">Me</router-link> -->
        <!-- <a id="home" href="#/projects">Home</a> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'app-header',
  methods: Vuex.mapActions(['logout']),
  computed: {
    ...Vuex.mapGetters('security', ['user']),
    ...Vuex.mapState('project', {
      project: state => state.project.name ? state.project.name : 'No Project Selected'
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../style/variables';

#app-header {
    background-color: $blue;
    color: $white;
    padding: 15px 0 0;
    min-height: 50px;
    // margin-bottom: 30px;
    z-index: 20;

    position: fixed;
    width: 100%;
    top: 0;

    .user_menus {
        float: right;
    }

    a {
        margin-left: 10px;
        color: white;
    }

}
</style>
