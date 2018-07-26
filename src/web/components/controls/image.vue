<template>
<div style="overflow: auto;" v-if="value">
  <div class="col s3">
    <div class="collection">
      <div class="collection-item image-container">
        <div v-if="url != ''">
          <img class="banner" :src="url" />
        </div>
      </div>
      <div class="collection-item info-box">
        <input type="text" v-model="value.caption" />
        <div class="file-field input-field right">
          <div class="btn blue upload-image valign-wrapper">
            <i class="material-icons center">file_upload</i>
            <input type="file" @change="setImage" />
          </div>
        </div>
        <button class="waves-effect waves-light btn blue clear-image" @click="clearImage">Clear</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import api from '@/api';

const emptyModel = { url: '', store: '', id: '', caption: '', meta: {} };

export default {
  name: 'whppt-image',
  props: ['value', 'projectId'],
  data() {
    return {
      showPreview: true
    };
  },
  mounted: function() {
    if (!this.value) this.$emit('input', emptyModel);
  },
  computed: {
    url: function() {
      return this.value ? this.value.url : emptyModel.url
    }
  },
  methods: {
    setImage: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      console.log('FILES[0]', files[0])
      this.files = files[0]

      this.showPreview = false;
      return api.image.upload(this.projectId, files[0])
        .then(image_info => {
          image_info.caption = this.value.caption;
          this.$emit('input', image_info)
          this.showPreview = true;
        });
    },
    clearImage: function() {
      this.$emit('input', emptyModel);
    }
  },
};
</script>

<style lang="scss" scoped>
.collection {
    min-height: 400px;
    width: 100%;
    position: relative;
}
img {
    width: 100%;
    height: auto;
    max-height: 400px;
}
input {
    display: inline-block;
    width: auto !important;
}
input[type=text].file-path {
    display: none;

    &.preview {
        display: block;
    }
}
.upload-image {
    height: 100%;
    padding: 24px;
}
.image-container {
    min-height: 312px;
}
.info-box {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}
.file-field {
    margin-top: auto !important;
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
}
.clear-image {
    display: block !important;
}
</style>
