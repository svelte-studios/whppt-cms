<template>
<div>
  <div v-if="list"
       class="list row"
       :id="'model_list_' + type">
    <div class="col s12">
      <draggable v-model="myList"
                 element="ul"
                 v-if="!busy && showList()"
                 class="collection">
        <!-- :options="{group:'people'}"
                 @start="drag=true"
                 @end="drag=false"> -->
        <li v-for="item in myList"
            :id="'model_id_' + item.id"
            class="collection-item"
            :key="item.id">
          <div class="row">
            <router-link :to="{name: 'model',params: getItemArgs(item)}"
                         class="col s6">
              {{ item._name }} ({{ item.id }})
            </router-link>
            <div class="col s1">
              <button class="delete btn-floating btn-small waves-effect waves-light blue"
                      @click="deleteModel(getItemArgs(item))">
                  <i class="material-icons left">delete</i>
                </button>
            </div>
            <i class="list__drag material-icons">drag_handle</i>
          </div>
        </li>
      </draggable>
      <!-- <li v-for="item in list" :id="'model_id_' + item.id" class="collection-item">
          <div class="row">
            <router-link :to="{name: 'model',params: getItemArgs(item)}" class="col s6">
              {{ item._name }} ({{ item.id }})
            </router-link>
            <div class="col s1">
              <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="item != last()" @click="moveDown(getItemArgsWithModel(item))">
                <i class="material-icons left">keyboard_arrow_down</i>
              </button>
            </div>
            <div class="col s1">
              <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="item != first()" @click="moveUp(getItemArgsWithModel(item))">
                <i class="material-icons left">keyboard_arrow_up</i>
              </button>
            </div>
            <div class="col s1">
              <button class="delete btn-floating btn-small waves-effect waves-light blue" @click="deleteModel(getItemArgs(item))">
                <i class="material-icons left">delete</i>
              </button>
            </div>
          </div>
        </li> -->
    </div>
    <div id="no_models"
         v-if="!busy && !showList()">
      There are currently no {{model_type.label.plural}}.
    </div>
    <router-link id="model_new"
                 :to="{ name: 'model', params: { projectId, type, id: 'new' }}"
                 class="waves-effect waves-light btn blue">
      <i class="material-icons left">add</i> New
    </router-link>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'collection-list',
  props: ['projectId', 'type', 'id'],
  components: { draggable, },
  data() {
    return {
      busy: true
    }
  },
  mounted() {
    this.busy = true;

    this.loadModelType({
        projectId: this.projectId,
        type: this.type
      })
      .then(() => this.loadModels({
        projectId: this.projectId,
        type: this.type
      }))
      .then(() => {
        this.busy = false
      });
  },
  watch: { '$route': 'fetchModel' },
  // beforeRouteUpdate(to, from, next) {
  //   this.$store.dispatch('loadObjects', to.params.type);
  //   next();
  // },
  methods: {
    ...Vuex.mapActions('model', [
      'loadModels', 'deleteModel', 'reOrder',
      'loadModelType'
    ]),
    ...Vuex.mapGetters('model', ['first', 'last', 'showList']),
    getItemArgs(item) {
      return {
        projectId: this.projectId,
        type: this.type,
        id: item.id
      };
    },
    getItemArgsWithModel(item) {
      return {
        projectId: this.projectId,
        type: this.type,
        id: item
      };
    },
    fetchModel: function() {
      let args = {
        projectId: this.projectId,
        type: this.type,
        id: this.id
      }
      this.busy = true;

      this.loadModelType({
          projectId: this.projectId,
          type: this.type
        })
        .then(() => this.loadModels({
          projectId: this.projectId,
          type: this.type
        }))
        .then(() => {
          this.busy = false
        });
    }
  },
  computed: {
    ...Vuex.mapState('model', ['list', 'model_type']),
    myList: {
      get() {
        return this.list;
      },
      set(value) {
        this.reOrder({
          projectId: this.projectId,
          type: this.type,
          value
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list__drag {
    float: right;
    cursor: move;
}
</style>
