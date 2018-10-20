<template>
<div>
  <div v-if="loading">
    Busy ...
  </div>
  <div v-if="!model.id">
    You need to save this item first.
  </div>
  <div v-if="model.id">

    <draggable v-model="orderedList"
               element="ul"
               v-if="!loading && orderedList && orderedList.length"
               class="collection">
      <li v-for="item in orderedList"
          :key="item.order"
          class="element col s12">
        <i class="material-icons drag">drag_handle</i>
        <router-link :to="{name: 'model',params: getEditArgs(item)}">
          {{ item.title }}
        </router-link>
        <button class="waves-effect waves-light btn blue remove-btn"
          @click.stop.prevent="remove(item)">
          Remove
        </button>
      </li>
    </draggable>


    <div class="col s12 new">
      <div class="col s5"
           v-for="a in editableAttributes"
           :key="a.name">
        <label>Name:</label>
        <input type="text" v-model="newItem[a.name]" />
      </div>
        <button class="waves-effect waves-light btn create-link" @click="add">
          <i class="material-icons center">add</i>
          <span>{{att.config.addLabel}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import draggable from "vuedraggable";

export default {
  name: "whppt-ordered-type-list",
  props: ["value", "projectId", "att", "type"],
  components: { draggable },
  data() {
    return {
      loading: true,
      list: [],
      newItem: {}
    };
  },
  mounted() {
    const vm = this;
    if (!this.value) this.$emit("input", []);
    const ids = _.map(this.value, v => v.id);
    return api.obj
      .filterByIds(this.projectId, this.att.config.type, ids)
      .then(results => {
        vm.list = _.map(results, r => {
          return {
            id: r.id,
            ..._.reduce(
              vm.editableAttributes,
              (fieldVals, att) => {
                fieldVals[att.name] = r[att.name] || "Unknown";
                return fieldVals;
              },
              {}
            )
          };
        });
        this.loading = false;
      });
  },
  methods: {
    ...Vuex.mapActions("model", ["save", "deleteModel"]),
    add() {
      const vm = this;
      this.loading = true;
      const addingItem = { parentId: this.model.id, ...this.newItem };
      const args = {
        projectId: this.projectId,
        type: this.att.config.type,
        doc: addingItem
      };
      return this.save(args).then(id => {
        vm.list.push({ id, ...addingItem });
        const existingOrdered = _.map(vm.orderedList, o => ({
          id: o.id,
          order: o.order
        }));
        const newValue = _.concat(existingOrdered, {
          id,
          order: existingOrdered.length
        });
        this.$emit("input", newValue);
        return this.saveMe().then(() => {
          this.newItem = {};
          this.loading = false;
        });
      });
    },
    remove(item) {
      const deleteArgs = {
        projectId: this.projectId,
        type: this.att.config.type,
        id: item.id
      };
      return this.deleteModel(deleteArgs).then(() => {
        this.loading = true;
        const newValue = _.filter(this.value, v => v.id !== item.id);
        this.$emit("input", newValue);
        return this.saveMe().then(() => {
          this.loading = false;
        });
      });
    },
    saveMe() {
      const saveArgs = {
        projectId: this.projectId,
        type: this.type
      };
      return this.save(saveArgs);
    },
    getEditArgs(item) {
      return {
        projectId: this.projectId,
        type: this.att.config.type,
        id: item.id
      };
    }
  },
  computed: {
    ...Vuex.mapState("project", ["project"]),
    ...Vuex.mapState("model", ["model"]),
    orderedList: {
      get() {
        const vm = this;
        const ordered = _.orderBy(this.value, v => v.order);
        return _.map(ordered, (item, index) => {
          return {
            order: index,
            ...{ title: "Unknown" },
            ..._.find(vm.list, li => li.id === item.id)
          };
        });
      },
      set(value) {
        this.loading = true;
        _.each(value, (v, index) => {
          const item = _.find(this.value, i => i.id === v.id);
          item.order = index;
        });
        return this.saveMe().then(() => {
          this.loading = false;
        });
      }
    },
    editableAttributes() {
      const type = _.find(
        this.project.types,
        t => t.id === this.att.config.type
      );
      if (!type) return [];
      return _.filter(type.attributes, att => {
        return _.includes(this.att.config.attributes, att.name);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.new {
  border: 1px solid blue;
}
.element {
  padding: 3px;
}
.drag {
  cursor: pointer;
  float: right;
}
.remove-btn {
  float: right;
}
</style>
