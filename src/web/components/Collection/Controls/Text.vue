<template>
  <div>
    <span>{{ att.name}}: </span>
    <input type="text"
      :name="att.name"
      v-model="data[att.name]"
      class="input-field col s6" />
  </div>
</template>

<script>
export default {
  name: 'core-input-text',
  props: ['att', 'data'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
