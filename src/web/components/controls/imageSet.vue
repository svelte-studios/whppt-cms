<template>
<div>
  <div class="row">
    <div v-for="image in value">
      <div class="col s3">
        <div class="collection">
          <div class="collection-item">
            <input type="hidden" :value="image.id" />
            <input type="hidden" :value="image.url" />
            <input type="hidden" :value="image.store" />
            <img class="gallery" :src="image.url" />
            <button @click="removeImage(image)">remove</button>
          </div>
          <div class="collection-item info-box">
            <!-- <span>Caption: </span> -->
            <input type="text" v-model="value.caption" />
          </div>
        </div>
      </div>
    </div>
    <div class="col s3">
      <div class="upload-card collection">
        <div class="collection-item">
          <div class="file-field input-field">
            <div class="btn grey lighten-1 upload-image">
              <i class="material-icons center">file_upload</i>
              <div>Add Image</div>
              <input type="file" @change="addImage" :value="newImage" />
            </div>
            <!-- <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/api';

export default {
  name: 'whppt-image-set',
  props: ['value', 'projectId'],
  mounted: function() {
    if (!this.value) this.$emit('input', []);
  },
  data: () => {
    return {
      newImage: ''
    }
  },
  methods: {
    addImage: function(e) {
      let vm = this;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.showPreview = false;
      return api.image.upload(this.projectId, files[0]).then(image_info => {
        vm.$emit('input', this.value);
        vm.value.push(image_info);
        vm.newImage = '';
      });
    },

    removeImage: function(image) {
      let original = _.find(this.value, { url: image.url });
      this.value.splice(this.value.indexOf(original), 1);
      this.$emit('input', this.value);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.collection {
    min-height: 400px;
}
img.gallery {
    width: 100%;
    height: auto;
    max-height: 400px;
}
input {
    display: inline-block;
    width: auto !important;
}
.upload-image {
    height: 100%;
    padding: 24px;
    float: none !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 400px !important;
}
.info-box {
    position: relative;
}
.file-field {
    margin-top: auto !important;
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
