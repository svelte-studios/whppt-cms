<template>
<div class="row">
  <div class="col s12">
    <div>
      <div class="row">
        <div class="col s12 whppt-card-title">
          <label>Title</label>
          <whppt-text v-model="value.title"></whppt-text>
        </div>
      </div>
      <div class="row">
        <div class="col s12 whppt-card-description">
          <label>Description</label>
          <whppt-markdown v-model="value.description"></whppt-markdown>
        </div>
      </div>
      <div class="row">
        <div class="col s12 whppt-card-image">
          <label>Image</label>
          <whppt-image v-model="value.image"
                       :projectId="projectId"></whppt-image>
        </div>
      </div>
      <div class="row">
        <div class="col s12 whppt-card-cta">
          <label>Call to action (CTA)</label>
          <whppt-cta v-model="value.cta"></whppt-cta>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import whpptText from '../text';
import whpptMarkdown from '../markdown';
import whpptImage from '../image';
import whpptCta from '../cta';

export default {
  name: 'whppt-card',
  props: ['value', 'projectId'],
  components: { whpptText, whpptMarkdown, whpptImage, whpptCta },
};
</script>

<style lang="scss" scoped>

</style>
