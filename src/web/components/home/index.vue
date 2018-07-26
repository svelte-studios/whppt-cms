<template>
<div class="valign-wrapper">
  <div class="container">
    <div class="row">
      <div class="col s6"
           style="display: none;">
        <signup></signup>
      </div>
      <div class="col s6">
        <h1>Login</h1>
        <div id="login_form">
          <label for="login_email">Email</label>
          <input id="login_email"
                 type="text"
                 class="validate active"
                 v-model="credentials.email"
                 @keyup.enter="login(credentials)">
          <label for="login_password">Password</label>
          <input id="login_password"
                 type="password"
                 class="validate active"
                 v-model="credentials.password"
                 @keyup.enter="login(credentials)">
          <input id='btn_login'
                 type="button"
                 value="Login"
                 @click="login(credentials)" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import signup from './signup';

export default {
  name: 'Home',
  components: {
    signup
  },
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    ...Vuex.mapActions('security', ['login'])
  },
  /* methods: {
    submit() {
      const self = this;
      const store = this.$store;

      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
      };
      auth.login(this, credentials, 'Home')
        .then(() => router.push('/'))
        .catch(err => {
          console.log(err, self);
          self.error = err.body.message;
        });
    }, */
  // },
};
</script>

<style lang="scss" scoped>
.valign-wrapper {
    height: 100vh;
}
</style>
