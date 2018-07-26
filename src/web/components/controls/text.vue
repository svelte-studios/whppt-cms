<template>
<div>
  <div class="col s6">
    <input type="text" :value="value" @input="$emit('input', $event.target.value)" class="input-field col s6" />

  </div>
</div>
</template>

<script>
export default {
  name: 'whppt-text',
  props: ['value'],
};
</script>

<style lang="scss" scoped>

</style>
