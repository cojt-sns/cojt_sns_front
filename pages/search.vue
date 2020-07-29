<template>
  <Main
    :groups="groups"
    :all="all"
    :search="search"
    :notifications="notifications"
  />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Group from '@/plugins/axios/modules/group';
import Notification from '@/plugins/axios/modules/notification';

export default {
  middleware: 'auth',
  watchQuery: true,
  components: {
    Main,
  },
  async asyncData({ query, params, $auth }) {
    const groups = await User.getUserGroup($auth.user.id);
    const notifications = (await Notification.getNotifications()).reverse();
    const all = await Group.searchGroup(null, null, -1);

    let search = [];

    if (query.keywords) {
      search = await Group.searchGroup(query.keywords);
    } else {
      search = await Group.searchGroup();
    }

    return {
      all,
      groups,
      search,
      notifications,
    };
  },
};
</script>

<style></style>
