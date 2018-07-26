<template>
<div class="whppt-lookup">
  <v-select :options="list"
            :value="value"
            @input="valueChanged"
            placeholder="Not Selected"></v-select>
  <span class="loading"
        v-if="loading">loading</span>
</div>
</template>

<script>
import vSelect from 'vue-select'
import api from '@/api';

export default {
  name: 'whppt-lookup',
  components: { vSelect },
  props: ['value', 'att', 'projectId'],
  data() {
    return {
      loading: true,
      list: []
    }
  },
  mounted() {
    let vm = this;
    api.obj.list(this.projectId, this.att.lookup.type)
      .then(typeList => {
        vm.list = _.map(typeList, i => {
          return {
            value: i[this.att.lookup.value],
            label: i[this.att.lookup.label]
          }
        })
        vm.loading = false;
      });
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
