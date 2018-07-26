<template>
<div class="whppt-select">
  <v-select :options="list"
            :value="value"
            @input="valueChanged"
            placeholder="Not Selected"></v-select>
</div>
</template>

<script>
import vSelect from 'vue-select'
import api from '@/api';

export default {
  name: 'whppt-select',
  components: { vSelect },
  props: ['value', 'att', 'projectId'],
  data() {
    return {
      list: this.att.select.values
    }
  },
  methods: {
    valueChanged(e) {
      this.$emit('input', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.whppt-lookup {

    & /deep/ input[type="search"] {
        border-bottom: none !important;
        box-shadow: unset !important;
    }

    ul {
        border-top: 1px solid grey;
    }
}
</style>
