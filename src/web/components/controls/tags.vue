<template>
<div>
  <div class="col s6">
    <div class="chips">
      <input placeholder="Enter a tag"
             @change="tag($event.target.value)"
             @input="$emit('input', $event.target.value)"
             :value="value"
             style="width: auto">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'whppt-tags',
  props: ['value'],
  mounted: function() {
    let vm = this;
    $('.chips', this.$el).material_chip({
      data: _.map(this.value, (v) => {
        return {
          tag: v
        }
      }),
      placeholder: 'Enter a tag and press enter',
      secondaryPlaceholder: 'Enter a tag',
    });
    $('.chips', this.$el).on('chip.add', function(e, chip) {
      vm.addTag(chip.tag);
    })
    $('.chips', this.$el).on('chip.delete', function(e, chip) {
      vm.removeTag(chip.tag);
    })
  },

  methods: {
    addTag(tag) {
      if (this.value)
        this.$emit("input", _.concat(this.value, tag));
      else
        this.$emit("input", [tag]);
    },
    removeTag(tag) {
      let newValue = _.filter(this.value, function(v) {
        return v != tag;
      });
      this.$emit("input", newValue);
    },
  }

};
</script>

<style lang="scss">
.chips {
    .input {
        width: 400px !important;
    }
}
</style>
