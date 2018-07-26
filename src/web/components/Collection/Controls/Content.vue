<template>
  <div >
    <div class="input-field col s6">
      <label>{{ att.label}} (Markdown): </label>
      <textarea v-model="data[att.name]" @input="update" class="materialize-textarea"
        style="width: 600px"></textarea>
    </div>
    <div class="input-field col s6">
      <label>{{ att.label}} (Preview): </label>
      <div v-html="preview" style="width: 600px" class="materialize-textarea"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'core-input-content',
  props: ['data', 'att'],
  data() {
    return {
      preview: marked(this.data && this.att && this.data[this.att.name]
          ? this.data[this.att.name] : '', { sanitize: true })
    };
  },
  methods: {
    update: _.debounce(function (e) {
      this.preview = marked(e.target.value, { sanitize: true })
    }, 300)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
