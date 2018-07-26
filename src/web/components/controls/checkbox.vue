<template>
<div>
  <div class="col s6">
    <label :for="att.name">
      <input type="checkbox"
             v-model="checked"
             :id="att.name">
      <span>{{att.label}}</span>
    </label>
  </div>
</div>
</template>

<!-- :value="value"
@value="$emit('input', $event.target.value)" -->

<script>
export default {
  name: 'whppt-checkbox',
  props: ['value', 'att'],
  data() {
    return {
      isChecked: this.value ? true : false
    }
  },
  computed: {
    checked: {
      get: function() {
        return this.isChecked;
      },
      set: function(newValue) {
        this.$emit('input', newValue ? '1' : '')
        this.isChecked = newvalue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
    position: static;
    opacity: 1;
}
</style>
