<template>
<div v-if="value">
  <div>
    <label>Layout: </label>
    <select v-model="value.layout"
            class="layout">
			<option disabled value="">Please select one</option>
			<option value="no_image">Text Only</option>
			<option value="image_left">Left Image</option>
			<option value="image_right">Right Image</option>
		</select>
  </div>
  <!-- <div>
    <label>Type:</label>
    <input v-model="value.type" class="type"></input>
  </div> -->
  <div>
    <whppt-image v-if="value.layout == 'image_left'"
                 :projectId="projectId"
                 v-model="value.image"></whppt-image>
    <label>Text:</label>
    <textarea v-model="value.text"
              class="materialize-textarea text"></textarea>
    <whppt-image v-if="value.layout == 'image_right'"
                 :projectId="projectId"
                 v-model="value.image"></whppt-image>
  </div>
</div>
</template>

<script>
import whpptImage from './image';

export default {
  name: 'whppt-markdown-2',
  props: ['value', 'projectId'],
  components: { whpptImage },
  mounted: function() {
    let defaultValue = {
      text: '',
      layout: 'no_image',
      image: undefined
    };

    if (!this.value) this.$emit('input', defaultValue);
    if (this.value && !this.value.layout) this.value.layout = 'no_image';
  },
};
</script>

<style lang="scss" scoped>
select {
    display: inline-block;
}
</style>
