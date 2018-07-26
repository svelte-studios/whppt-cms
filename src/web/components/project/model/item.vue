<template>
<div id="model_item"
     :data-id="'model_id_' + id"
     v-if="!busy">
  <div v-if="model"
       class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab"
            v-for="group, groupName in groupedAttributes"
            @click="showTab(groupName)">
          {{groupName}}
        </li>
      </ul>
      <hr />
      <div v-for="group, groupName in groupedAttributes"
           :id="tabName(groupName)"
           v-if="groupName == activeTab">
        <div v-for="att in group">
          <div class="row">
            <label>{{att.label}}</label>
            <component :is="att.control"
                       v-model="model[att.name]"
                       :projectId="projectId"
                       :att="att"
                       :id="'field_' + att.name"></component>
          </div>
        </div>
      </div>
      <button id="model_save"
              @click="saveModel"
              class="waves-effect waves-light btn blue">
              <i class="material-icons right">save</i>
              Save</button>
    </div>
  </div>
</div>
</template>

<script>
import whpptText from 'Components/controls/text';
import whpptMarkdownPreview from 'Components/controls/markdownPreview';
import whpptMarkdownPreview2 from 'Components/controls/markdownPreview2';
import whpptImage from 'Components/controls/image';
import whpptCta from 'Components/controls/cta';
import whpptScheduleOpenHours from 'Components/controls/schedule/openHours';
import whpptImageSet from 'Components/controls/imageSet';
import whpptLinks from 'Components/controls/links';
import whpptContent from 'Components/controls/content';
import whpptDate from 'Components/controls/date';
import whpptTags from 'Components/controls/tags';
import whpptVideo from 'Components/controls/video';
import whpptCards from 'Components/controls/cards/cards';
import whpptCheckbox from 'Components/controls/checkbox';
import whpptLookup from 'Components/controls/lookup';
import whpptSelect from 'Components/controls/select';

export default {
  name: 'model',
  props: ['projectId', 'type', 'id'],
  components: {
    whpptText,
    whpptMarkdownPreview,
    whpptMarkdownPreview2,
    whpptImage,
    whpptCta,
    whpptScheduleOpenHours,
    whpptImageSet,
    whpptContent,
    whpptLinks,
    whpptDate,
    whpptTags,
    whpptVideo,
    whpptCards,
    whpptCheckbox,
    whpptLookup,
    whpptSelect
  },
  data() {
    return {
      busy: false,
      activeTab: 'General'
    }
  },
  mounted() {
    this.fetchModel();
  },
  watch: {
    '$route': 'fetchModel'
  },
  methods: {
    ...Vuex.mapActions('model', ['loadAttributes', 'loadModel', 'save']),
    saveModel: function() {
      let vm = this;
      vm.busy = true;
      let args = {
        projectId: this.projectId,
        type: this.type,
        id: this.id
      };
      console.log('ARGS', args)
      this.save(args).then(() => vm.busy = false);
    },
    fetchModel: function() {
      let args = {
        projectId: this.projectId,
        type: this.type,
        id: this.id
      }
      this.busy = true;
      this.loadAttributes(args)
        .then(() => this.loadModel(args))
        .then(() => {
          this.busy = false
        });
    },
    tabName(raw) {
      return _.camelCase(raw);
    },
    showTab(groupName) {
      this.activeTab = groupName;
    }
  },
  computed: Vuex.mapState('model', ['model', 'attributes', 'groupedAttributes'])
};
</script>

<style lang="scss" scoped>
.tab {
    padding: 8px;
}
</style>
