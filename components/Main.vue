<template>
  <div class="columns is-mobile">
    <Menu />
    <Group v-if="$route.name.includes('groups')" />
    <Posts v-if="$route.name.includes('groups')" />
    <User v-if="$route.name.includes('users')" :user="user" />
    <Search v-if="$route.name == 'search'" />
    <div
      class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile has-background-black"
    >
      Notification
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Menu';
import Group from '~/components/Group';
import Posts from '~/components/Posts';
import Search from '~/components/Search';
import User from '~/components/User';

export default {
  components: {
    Menu,
    Group,
    Posts,
    Search,
    User,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.columns {
  height: 100vh;
  width: 100vw;
  margin: 0;
  .column {
    // overflow-y: scroll;
  }
}
</style>
