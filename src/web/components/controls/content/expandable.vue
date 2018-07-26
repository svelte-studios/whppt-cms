<template>
<div class="element-header">
  <div class="collapsible-header"
       @click="toggle">
    <span>{{ title }}</span>
    <slot name="actions"></slot>
  </div>
  <div class="collapsible-body"
       :class="{expanded: expanded}">
    <slot></slot>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'whppt-content-expandable',
  props: ['title'],
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss" scoped>
.collapsible-header {
    display: flex;
    cursor: pointer;
    line-height: 1.5;
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #ddd;

    div {
        position: absolute;
        right: 20px;
        top: 6px;

        .material-icons {
            width: inherit;
        }
    }
}
.collapsible-body {
    background-color: #fcfcfc;
    border: 1px solid #ddd;
    border-top: none;
    &.expanded {
        display: block;
    }
}
</style>
