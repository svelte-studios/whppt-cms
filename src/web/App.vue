<template>
  <div>
    <span v-if="error">{{error}}</span>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: Vuex.mapState(['error'])
};
</script>

<style lang="scss">
  @import 'style/app.scss';

  #app {
    margin: 0;
    padding: 0;
  }

  html, body, #app {
    height: 100%;
  }

  .full-height {
    height: 100%;
  }
</style>
