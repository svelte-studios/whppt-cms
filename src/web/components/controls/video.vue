<template>
<div v-if="value">
  <div id="player"></div>
  <div>
    <label>ID</label>
    <input class="id" v-model="value.youtube.id" />
    <label>Header</label>
    <input class="header" v-model="value.header" />
    <label>Description</label>
    <div class="input-field">
      <textarea class="description materialize-textarea" v-model="value.description" />
    </div>
    <label>CTA URL</label>
    <input class="cta-url" v-model="value.cta_url" />
    <label>CTA Text</label>
    <input class="cta-text" v-model="value.text" />
  </div>
</div>
</template>

<script>
import api from '@/api';

const emptyModel = {
  youtube: { id: '' },
  width: '',
  height: '',
  header: '',
  description: '',
  cta_url: '',
  cta_text: ''
};

export default {
  name: 'whppt-video',
  props: ['value', 'projectId'],
  mounted: function() {
    if (!this.value) this.$emit('input', emptyModel);
  }
};
</script>

<style lang="scss" scoped>
</style>
