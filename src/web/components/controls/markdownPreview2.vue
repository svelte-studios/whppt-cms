<template>
<div>
  <div class="col s6">
    <label>Markdown: </label>
    <div>
      <whppt-markdown-2 @input="update"
                        :value="value">
      </whppt-markdown-2>
    </div>
  </div>
  <div class="col s6">
    <label>Preview: </label>
    <div class="input-field">
      <div v-html="preview"></div>
    </div>
  </div>
</div>
</template>

<script>
import whpptMarkdown2 from './markdown2';

export default {
  name: 'whppt-markdown-preview-2',
  props: ['value'],
  components: { 'whppt-markdown-2': whpptMarkdown2 },
  data() {
    return {
      preview: marked(this.data && this.att &&
        this.data[this.att.name] ?
        this.data[this.att.name] : '', {
          sanitize: true
        })
    };
  },
  methods: {
    update: _.debounce(function(value) {
      this.$emit('input', value);
      this.preview = marked(value, {
        sanitize: true
      });
    }, 300)
  },
};
</script>

<style lang="scss" scoped>

</style>
