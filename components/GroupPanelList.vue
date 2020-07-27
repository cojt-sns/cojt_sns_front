<template>
  <div class="tile is-parent is-vertical">
    <GroupPanel
      v-for="group in groups"
      :key="group.id"
      class="panels"
      :group="group"
    />
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
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
