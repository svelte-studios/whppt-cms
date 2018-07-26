<template>
<div>
  <div class="col s12 whppt-cards-title">
    <label>Title</label>
    <whppt-text v-model="value.title"></whppt-text>
  </div>
  <div class="col-sm-12 "
       v-for="card in value.cards">
    <whppt-content-expandable :title="'Card: ' + card.title">
      <div slot="actions">actions</div>
      <whppt-card class="whppt-card"
                  :projectId="projectId"
                  :value="card"></whppt-card>
    </whppt-content-expandable>
  </div>
  <div class="col-sm-12">
    <input type="button"
           value="Add Card"
           class="add-card"
           @click="addCard()" />
  </div>
</div>
</template>

<script>
import whpptCard from './card';
import whpptContentExpandable from '../content/expandable';
import whpptText from '../text';

export default {
  name: 'whppt-cards',
  props: ['value', 'projectId'],
  components: { whpptContentExpandable, whpptCard, whpptText },
  mounted() {
    if (!this.value) this.$emit('input', { title: '', cards: [] });
  },
  methods: {
    addCard() {
      this.value.cards.push({});
    }
  }
};
// @input="$emit('input', value)
</script>

<style lang="scss" scoped>

</style>
