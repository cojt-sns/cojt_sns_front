<template>
  <div class="columns is-mobile">
    <Notification :notifications="notifications" class="notif" />
  </div>
</template>

<script>
import Notification from '@/plugins/axios/modules/notification';
import NotificationComponent from '@/components/Notification';

export default {
  watchQuery: true,
  components: {
    Notification: NotificationComponent,
  },
  async asyncData({ query, params, $auth, isMobile, redirect }) {
    if (!isMobile) redirect('/groups');

    const notifications = (await Notification.getNotifications()).reverse();

    return {
      notifications,
    };
  },
};
</script>

<style lang="scss" scoped>
.notif {
  width: 100vw !important;
}
</style>
