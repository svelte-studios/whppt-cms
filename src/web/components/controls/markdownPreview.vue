<template>
<div>
  <div class="col s6">
    <label>Markdown: </label>
    <div>
      <whppt-markdown @input="update"
                      :value="value">
      </whppt-markdown>
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
import whpptMarkdown from './markdown';

export default {
  name: 'whppt-markdown-preview',
  props: ['value'],
  components: { whpptMarkdown },
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
