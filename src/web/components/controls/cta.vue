<template>
<div v-if="value">
  <div class="row">
    <div class="col s6">
      <label>Name:</label>
      <input v-model="value.text" class="text input-field"></input>
    </div>
    <div class="col s6">
      <label>Link:</label>
      <input v-model="value.url" class="url input-field"></input>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'whppt-cta',
  props: ['value'],
  mounted: function() {
    if (!this.value) this.$emit('input', { text: '', url: '' });
  },
};
</script>

<style lang="scss" scoped>

</style>
