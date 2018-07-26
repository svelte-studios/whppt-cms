<template>
  <div>

    <div>
      <span>{{ att.label}}: </span>
      <ul>
        <li v-for="image in val">
          <input type="hidden" :value="image.id" />
          <input type="hidden" :value="image.url" />
          <input type="hidden" :value="image.store" />
          {{ image.url }}
          <button @click="removeImage(image)">remove</button>
        </li>
      </ul>
    </div>

    <div class="file-field input-field">
      <div class="btn">
        <span>Add Image:</span>
        <input type="file"  @change="addImage" :value="newImage" />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'core-input-text',
  props: ['data', 'att'],
  data: () => {
    return {
      newImage: ''
    }
  },
  computed: {
    val() {
      this.data[this.att.name] = this.data[this.att.name] || [];
      return this.data[this.att.name];
    }
  },
  methods: {
    addImage: function(e) {
      let vm = this;
      let store = this.$store;

      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let upload = {
        att: this.att,
        file: files[0]
      };

      let args = {
        att: this.att,
        file: files[0],
      };
      store.dispatch('addImage', args)
        .then(() => vm.newImage = '');
    },

    removeImage: function(image) {
      let store = this.$store;
      store.dispatch('removeImage', { att: this.att, url: image.url });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
