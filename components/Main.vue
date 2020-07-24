<template>
  <div class="columns is-mobile">
    <Menu class=" is-hidden-mobile" />
    <Group :groups="groups" class=" is-hidden-mobile" />
    <Posts
      v-if="$route.name.includes('groups')"
      :posts="posts"
      :groups="groups"
      :group-user="groupUser"
    />
    <User v-if="$route.name.includes('users')" :user="user" :groups="groups" />
    <Search v-if="$route.name == 'search'" :search="search" :groups="groups" />
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
    groupUser: {
      type: Object,
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
