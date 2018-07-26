<template>
<div class="app-menu">
  <template v-for="group, groupName in groups">
    <nav-section :name="groupName"
                 :id='"project_" + project.id'
                 :collapsed="activeGroup != groupName"
                 @selected="() => activeGroup = groupName">
      <template v-for="type in group">
          <nav-button v-if="!type.single"
            :text="type.label.plural"
            :slug="type.slug.plural"
            :location="{ path: `/project/${project.id}/type/${type.id}` }"
            icon="/static/icons/edit.svg">
          </nav-button>
          <nav-button v-if="type.single"
            :text="type.label.singular"
            :slug="type.slug.singular"
            :location="{ path: `/project/${project.id}/type/${type.id}/model/detail` }"
            icon="/static/icons/edit.svg">
          </nav-button>
      </template>
  </nav-section>
  </template>
  <!-- <nav-section name="Admin">
    <nav-button text="Users"
                 disabled="true"
                 :location="{ path: '/users' }"
                 icon="/static/icons/edit.svg">
    </nav-button>
  </nav-section> -->
</div>
</template>

<script>
import navSection from './section';
import navButton from './button';

export default {
  name: 'menu',
  prop: ['project'],
  data() {
    return {
      activeGroup: ''
    }
  },
  components: {
    navSection,
    navButton
  },
  computed: {
    ...Vuex.mapState('project', ['project']),
    groups() {
      let groups = _.groupBy(this.project.types, t => t.group || 'Other');
      this.activeGroup = 'Other';
      if (groups[0]) this.activeGroup = groups[0].group || 'Other';
      return groups;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../style/variables';

.app-menu {
    background-color: $gray-100;
    color: $gray-700;
    width: 300px;
    height: calc(100% - 50px);
    position: fixed;
    left: 0;
    overflow: scroll;
}
</style>
