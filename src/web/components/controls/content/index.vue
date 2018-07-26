<template>
<div>
  <div class="menu">
    <div id="content-buttons" class="">
      <button class="waves-effect waves-light btn addHeader" @click="addElement('whppt-content-header')">Add Header</button>
      <button class="waves-effect waves-light btn addParagraph" @click="addElement('whppt-markdown')">Add Paragraph (do not use)</button>
      <button class="waves-effect waves-light btn addParagraph2" @click="addElement('whppt-markdown-2')">Add Paragraph</button>
      <button class="waves-effect waves-light btn addImage" @click="addElement('whppt-image')">Add Image</button>
      <button class="waves-effect waves-light btn addVideo" @click="addElement('whppt-video')">Add Video</button>
      <button class="waves-effect waves-light btn addCTA" @click="addElement('whppt-cta')">Add CTA</button>
      <button class="waves-effect waves-light btn addImageGallery" @click="addElement('whppt-image-set')">Add Image Gallery</button>
    </div>
  </div>
  <div class="elements" v-if="value">
    <div class="element" v-if="value.elements" v-for="el in value.elements">
      <whppt-content-expandable title="Header" v-if="el.type == 'whppt-content-header'">
        <whppt-content-header :projectId="projectId" v-model="el.value_header"></whppt-content-header>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                                  <i class="material-icons left">keyboard_arrow_up</i>
                                </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                                  <i class="material-icons left">keyboard_arrow_down</i>
                                </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                                  <i class="material-icons left">delete</i>
                                </button>
        </div>
      </whppt-content-expandable>
      <whppt-content-expandable title="Paragraph" v-if="el.type == 'whppt-markdown'">
        <whppt-markdown :projectId="projectId" v-model="el.value_markdown"></whppt-markdown>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                            <i class="material-icons left">keyboard_arrow_up</i>
                          </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                            <i class="material-icons left">keyboard_arrow_down</i>
                          </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                            <i class="material-icons left">delete</i>
                          </button>
        </div>
      </whppt-content-expandable>
      <whppt-content-expandable title="Custom Paragraph" v-if="el.type == 'whppt-markdown-2'">
        <whppt-markdown-2 :projectId="projectId" v-model="el.value_markdown_2"></whppt-markdown-2>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                              <i class="material-icons left">keyboard_arrow_up</i>
                            </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                              <i class="material-icons left">keyboard_arrow_down</i>
                            </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                              <i class="material-icons left">delete</i>
                            </button>
        </div>
      </whppt-content-expandable>
      <whppt-content-expandable title="Image" v-if="el.type == 'whppt-image'">
        <whppt-image :projectId="projectId" v-model="el.value_image"></whppt-image>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                         <i class="material-icons left">keyboard_arrow_up</i>
                       </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                         <i class="material-icons left">keyboard_arrow_down</i>
                       </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                         <i class="material-icons left">delete</i>
                       </button>
        </div>
      </whppt-content-expandable>
      <whppt-content-expandable title="Video" v-if="el.type == 'whppt-video'">
        <whppt-video :projectId="projectId" v-model="el.value_video"></whppt-video>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                         <i class="material-icons left">keyboard_arrow_up</i>
                       </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                         <i class="material-icons left">keyboard_arrow_down</i>
                       </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                         <i class="material-icons left">delete</i>
                       </button>
        </div>
      </whppt-content-expandable>
      <whppt-content-expandable title="CTA" v-if="el.type == 'whppt-cta'">
        <whppt-cta :projectId="projectId" v-model="el.value_cta"></whppt-cta>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                       <i class="material-icons left">keyboard_arrow_up</i>
                     </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                       <i class="material-icons left">keyboard_arrow_down</i>
                     </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                       <i class="material-icons left">delete</i>
                     </button>
        </div>
      </whppt-content-expandable>
      <whppt-content-expandable title="Image Gallery" v-if="el.type == 'whppt-image-set'">
        <whppt-image-set :projectId="projectId" v-model="el.value_image_set"></whppt-image-set>
        <div slot="actions">
          <button class="up btn-floating btn-small waves-effect waves-light blue" v-if="el != first()" @click.stop="moveUp(el)">
                       <i class="material-icons left">keyboard_arrow_up</i>
                     </button>
          <button class="down btn-floating btn-small waves-effect waves-light blue" v-if="el != last()" @click.stop="moveDown(el)">
                       <i class="material-icons left">keyboard_arrow_down</i>
                     </button>
          <button class="remove-btn delete btn-floating btn-small waves-effect waves-light blue" @click.stop="removeElement(el)">
                       <i class="material-icons left">delete</i>
                     </button>
        </div>
      </whppt-content-expandable>
    </div>
  </div>
</div>
</template>

<script>
import whpptContentExpandable from './expandable';
import whpptContentHeader from './header';
import whpptMarkdown from '../markdown';
import whpptMarkdown2 from '../markdown2';
import whpptImage from '../image';
import whpptVideo from '../video';
import whpptCta from '../cta';
import whpptImageSet from '../imageSet';

export default {
  name: 'whppt-content',
  props: ['value', 'label', 'projectId'],
  components: { whpptContentExpandable, whpptContentHeader, whpptMarkdown, whpptMarkdown2, whpptImage, whpptVideo, whpptCta, whpptImageSet },
  mounted: function() {
    if (!this.value) this.$emit('input', { elements: [] });
  },
  methods: {
    addElement(type) {
      this.value.elements.push({ type });
    },
    removeElement(el) {
      this.value.elements = _.filter(this.value.elements, e => e != el);
    },
    first() {
      return _.first(this.value.elements)
    },
    last() {
      return _.last(this.value.elements)
    },
    moveUp(item) {
      let itemIndex = this.value.elements.indexOf(item);
      _.remove(this.value.elements, e => e == item);
      this.value.elements.splice(itemIndex - 1, 0, item);
    },
    moveDown(item) {
      let itemIndex = this.value.elements.indexOf(item);
      _.remove(this.value.elements, e => e == item);
      this.value.elements.splice(itemIndex + 1, 0, item);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
#content-buttons {
    padding: 20px;
}
.element-header {
    position: relative;
}
</style>
