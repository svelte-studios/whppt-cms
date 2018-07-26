<template>
<div>
  <textarea @input="$emit('input', $event.target.value)" :value="value" class="materialize-textarea"></textarea>
  <!-- <div>
    <label>Type:</label>
    <input v-model="value.type" class="type"></input>
  </div> -->
</div>
</template>

<script>
export default {
  name: 'whppt-markdown',
  props: ['value'],
  mounted: function() {
    if (!this.value) this.$emit('input', '');
  },
};
</script>

<style lang="scss" scoped>

</style>
