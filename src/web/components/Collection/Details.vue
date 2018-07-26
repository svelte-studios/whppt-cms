<template>
<div>
  <div class="loading"
       v-if="loading">
    Loading...
  </div>

  <div v-if="error"
       class="error">
    {{ error }}
  </div>

  <div v-if="obj"
       class="obj">
    <div v-for="att in attributes">
      <span>{{ att.label }}</span>
      <component :is="att.type"
                 v-model="obj[att.name]"
                 :label="att.label"></component>
    </div>
    <button @click="saveObj">Save</button>
  </div>
</div>
</template>

<script>
import text from './Controls/Text';
import image from './Controls/Image';
import content from './Controls/Content';
import operatingTimesWeekly from './Controls/OperatingTimesWeekly';
import imageSet from './Controls/ImageSet';
import whppt_content from 'controls/content';


export default {
  name: 'obj',
  props: ['project', 'type', 'id'],
  components: {
    'core-input-text': text,
    'core-image': image,
    'core-content': content,
    'core-operating-times-weekly': operatingTimesWeekly,
    'core-image-set': imageSet,
    'whppt-content': whppt_content
  },
  created() {
    let params = {
      project: this.project,
      type: this.type,
      id: this.id
    };
    this.$store.dispatch('loadObj', params);
  },
  beforeRouteUpdate(to, from, next) {
    let params = {
      project: to.params.project,
      type: this.type,
      id: to.params.id
    };
    this.$store.dispatch('loadObj', params);
    next();
  },
  methods: {
    saveObj() {
      let vm = this;
      let args = {
        project: this.project,
        type: this.type,
        obj: this.obj
      };
      this.$store.dispatch('saveObj', args)
        .then(() => vm.$forceUpdate());
    }
  },
  computed: Vuex.mapState({
    obj: state => state.object,
    attributes(state) {
      let type = this.type == 'detail' ? this.id : this.type;
      return _.find(state.project.types, {
        id: type
      }).attributes;
    },
    loading: 'loading',
    error: 'error'
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
