<template>
  <Main :groups="groups" :search="search" :notifications="notifications" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Group from '@/plugins/axios/modules/group';
import Notification from '@/plugins/axios/modules/notification';

export default {
  watchQuery: true,
  components: {
    Main,
  },
  async asyncData({ query, params, $auth }) {
    const groups = await User.getUserGroup($auth.user.id);
    const notifications = await Notification.getNotifications();

    let search = [];

    if (query.type === 'graph') {
      search = await Group.searchGroup(null, null, -1);
    } else if (query.keywords) {
      search = await Group.searchGroup(query.keywords);
    } else {
      search = await Group.searchGroup();
    }
    return {
      groups,
      search,
      notifications,
    };
  },
};
</script>

<style></style>
