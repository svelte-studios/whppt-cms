<template>
<div class="app-menu-section collection with-header">
  <div class="collection-header"
       @click="$emit('selected')">{{ name }}</div>
  <slot v-if='!collapsed'></slot>
</div>
</template>

<script>
export default {
  name: 'menu-section',
  props: ['name', 'collapsed'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
