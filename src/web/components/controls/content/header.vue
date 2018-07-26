<template>
<div class="element-header">
  <input type="text" :value="value" @input="$emit('input', $event.target.value)" />
</div>
</template>

<script>
export default {
  name: 'whppt-content-header',
  props: ['value']
};
</script>

<style lang="scss" scoped>

</style>
