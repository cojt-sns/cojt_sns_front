<template>
  <div class="columns is-mobile">
    <Menu />
    <Group :groups="groups" />
    <div
      v-if="$route.name.includes('panelTest') && panelArray"
      class="tile is-ancestor"
    >
      <div class="tile is-vertical POP">
        <div v-for="array in panelArray" :key="array.id" class="tile is-parent">
          <GroupPanel
            v-for="panel in array"
            :key="panel.id"
            class="panels"
            :group-name="panel.name"
            :description="panel.description"
            :group-member-number="panel.number"
          />
        </div>
      </div>
    </div>

    <User v-if="$route.name.includes('users')" :user="user" />
    <Search v-if="$route.name == 'search'" />
    <slot />
    <Notification />
  </div>
</template>

<script>
import Menu from '~/components/Menu';
import Group from '~/components/Group';
import Search from '~/components/Search';
import User from '~/components/User';
import Notification from '~/components/Notification';
import GroupPanel from '~/components/GroupPanel';

export default {
  components: {
    Menu,
    Group,
    Search,
    User,
    Notification,
    GroupPanel,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    posts: {
      type: Array,
      required: false,
      default: null,
    },
    groups: {
      type: Array,
      required: false,
      default: null,
    },
    panels: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      panelArray: null,
      groupName: 'HElloTEST',
      description: 'あいうえおかきくけこさしすせそ',
      gMN: 123,
    };
  },
  created() {
    if (this.panels !== null) {
      this.panelArray = this.arrayChunk(this.panels, 3);
    }
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

<style lang="scss" scoped>
.POP {
  height: fit-content;
}
.tile {
  .is-parent {
    padding-bottom: 0;
    padding-top: 0;
    height: fit-content;
  }
}
</style>
