<template>
  <div class="columns is-mobile">
    <Notification
      :groups="groups"
      :notifications="notifications"
      class="notif"
    />
  </div>
</template>

<script>
import Notification from '@/plugins/axios/modules/notification';
import NotificationComponent from '@/components/Notification';
import User from '@/plugins/axios/modules/user';

export default {
  middleware: 'auth',
  watchQuery: true,
  components: {
    Notification: NotificationComponent,
  },
  async asyncData({ query, params, $auth, isMobile, redirect }) {
    if (!isMobile) redirect('/groups');

    const groups = await User.getUserGroup($auth.user.id);
    const notifications = (await Notification.getNotifications()).reverse();

    return {
      groups,
      notifications,
    };
  },
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 0;
  .notif {
    width: 100vw !important;
  }
}
</style>
