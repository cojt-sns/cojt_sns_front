<template>
  <div class="columns is-mobile">
    <Menu />
    <Group :groups="groups" />
    <Posts
      v-if="$route.name.includes('groups')"
      :posts="posts"
      :groups="groups"
    />
    <User v-if="$route.name.includes('users')" :user="user" />
    <Search v-if="$route.name == 'search'" :search="search" />
    <slot />
    <Notification />
  </div>
</template>

<script>
import Menu from '~/components/Menu';
import Group from '~/components/Group';
import Posts from '~/components/Posts';
import Search from '~/components/Search';
import User from '~/components/User';
import Notification from '~/components/Notification';

export default {
  components: {
    Menu,
    Group,
    Posts,
    Search,
    User,
    Notification,
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
    search: {
      type: Array,
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
