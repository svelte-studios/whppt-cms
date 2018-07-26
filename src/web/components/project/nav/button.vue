<template>
<div :id="id">
  <div v-if="disabled"
       class="app-menu-button container-fluid disabled">
    <img :src="icon"
         class="circle" /> {{ text }}
  </div>
  <router-link v-if="!disabled"
               :to="linkTo"
               class="collection-item"
               active-class="active">
    <div class="app-menu-button container-fluid">
      <i class="type-icon material-icons circle">assignment</i> {{ text }}
    </div>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'menu-button',
  props: ['text', 'icon', 'disabled', 'location', 'slug'],
  // data() {
  //   return {
  //     linkTo: this.disabled ? '' : this.$attrs.location,
  //   };
  // },
  computed: {
    id() {
      return `nav_btn_${this.slug}`;
    },
    linkTo() {
      return this.disabled ? '' : this.location
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../style/variables';

img {
    width: 24px;
    border: 1px solid;
    border-color: $gray-300;
    padding: 2px;
}

.type-icon {
    vertical-align: middle;
}

.disabled {
    color: grey;
}
</style>
