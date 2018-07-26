<template>
<div>
  <h1>Signup</h1>
  <div id="signup_form">
    <label for="signup_email">Email</label>
    <input id="signup_email"
           type="text"
           class="validate active"
           v-model:value="model.email"
           @keyup.enter="signup(model)">
    <label for="signup_password">Password</label>
    <input id="signup_password"
           type="password"
           class="validate active"
           v-model:value="model.password"
           @keyup.enter="signup(model)">
    <label for="signup_confirm_password">Confirm Password</label>
    <input id="signup_confirm_password"
           type="password"
           class="validate active"
           v-model:value="confirm"
           @keyup.enter="signup(model)">
    <input id="btn_signup"
           type="button"
           value="Signup Now"
           :disabled="canSignup"
           @click="signup(model)" />
  </div>
</div>
</template>

<script>
export default {
  name: 'signup',
  data: function() {
    return {
      confirm: ''
    }
  },
  computed: {
    // ...Vuex.mapState('signup', ['signup']),
    model() {
      return this.$store.state.security.signup;
    },
    canSignup() {
      return !(
        this.model.email !== '' &&
        this.model.password !== '' &&
        this.confirm === this.model.password
      );
    }
  },
  methods: Vuex.mapActions('security', ['signup'])
};
</script>

<style scoped>
</style>
