<template>
  <v-select
    v-model="tags_"
    multiple
    :options="options"
    label="fullname"
    @search="fetchOptions"
  />
</template>

<script>
import vSelect from 'vue-select';
import Tag from '@/plugins/axios/modules/tag';
export default {
  components: {
    vSelect,
  },
  model: {
    prop: 'tags',
    event: 'change-tags',
  },
  props: {
    tags: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      options: this.tags,
      tags_: this.tags,
    };
  },
  watch: {
    tags_(newValue) {
      if (this.tags_ !== this.tag) this.$emit('change-tags', newValue);
    },
  },
  methods: {
    async fetchOptions(search, loading) {
      console.log(search);
      loading(true);
      const res = await Tag.searchTag(search, 0);
      if (res.count === 0) {
        this.options = [];
        loading(false);
        return;
      }
      this.options = res.map((item) => item.tag);
      loading(false);
    },
  },
};
</script>

<style lang="scss">
$vs-dropdown-z-index: 2147483647 !default;
@import 'vue-select/src/scss/vue-select.scss';
</style>
