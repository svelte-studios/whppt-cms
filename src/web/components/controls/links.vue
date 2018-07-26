<template>
<div>
  <div v-for="link in value" class="element">
    <div class="col s5">
      <label>Name:</label>
      <input type="text" class="name" v-model="link.name" />
    </div>
    <div class="col s5">
      <label>Url:</label>
      <input type="text" class="link" v-model="link.url" />
    </div>
    <div class="col s2">
      <button class="waves-effect waves-light btn blue remove-btn" @click="removeLink(link)">Remove</button>
    </div>
  </div>
  <div class="col s12">
    <button class="waves-effect waves-light btn create-link" @click="addLink">
      <i class="material-icons center">add</i>
      <span>Add Link</span>
    </button>
  </div>
</div>
</template>

<script>
import api from '@/api';

export default {
  name: 'whppt-links',
  props: ['value', 'projectId'],
  mounted: function() {
    if (!this.value) this.$emit('input', []);
  },
  methods: {
    addLink() {
      let newValue = _.concat(this.value, { name: '', url: '' })
      this.$emit('input', newValue);
    },
    removeLink(linkToRemove) {
      let newValue = _.filter(this.value, l => l != linkToRemove);
      this.$emit('input', newValue);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
