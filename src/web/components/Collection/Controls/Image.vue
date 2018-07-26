<template>
<div>
  <div>
    <span>{{ att.label}}: </span> {{ val.url }}
    <input type="text" v-model="val.url" />
    <input type="file" @change="setImage" />
  </div>
</div>
</template>

<script>
import api from '@/api';

export default {
  name: 'core-input-image',
  props: ['data', 'att'],
  computed: {
    val() {
      this.data[this.att.name] = this.data[this.att.name] || {
        url: '',
        store: '',
        id: ''
      };
      return this.data[this.att.name];
    },
  },
  methods: {
    setImage: function(e) {
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
      store.dispatch('uploadImage', args)
        .then(() => vm.$forceUpdate());
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
