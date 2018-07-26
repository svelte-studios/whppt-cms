<template>
<div>
  <div class="col s6">
    <input type="text"
           :value="value"
           class="input-field col s6" />
  </div>
</div>
</template>

<script>
export default {
  name: 'whppt-date',
  props: ['value'],
  mounted() {
    $('input', this.$el).pickadate({
      onSet: (context) => {
        if (_.has(context, 'clear'))
          this.onDateSelected()
        if (_.has(context, 'select'))
          this.onDateSelected(moment(context.select).format('YYYY-MM-DD'))
      }
    });
  },
  methods: {
    onDateSelected(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
