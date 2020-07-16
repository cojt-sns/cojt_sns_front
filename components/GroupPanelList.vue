<template>
  <div class="tile is-parent is-vertical POP">
    <div v-for="array in groupChunks" :key="array.id" class="tile is-parent">
      <GroupPanel
        v-for="group in array"
        :key="group.id"
        class="panels"
        :group="group"
      />
    </div>
  </div>
</template>

<script>
import GroupPanel from '~/components/GroupPanel';

export default {
  components: {
    GroupPanel,
  },
  props: {
    groups: {
      type: Array,
      required: false,
      default: null,
    },
  },
  computed: {
    groupChunks() {
      return this.arrayChunk(this.groups, 3);
    },
  },
  methods: {
    arrayChunk([...array], size = 1) {
      return array.reduce(
        (acc, value, index) =>
          index % size ? acc : [...acc, array.slice(index, index + size)],
        []
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
