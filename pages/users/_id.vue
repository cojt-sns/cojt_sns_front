<template>
  <Main :user="user" :groups="groups" :notifications="notifications" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Notification from '@/plugins/axios/modules/notification';

export default {
  components: {
    Main,
  },
  async asyncData({ params, $auth }) {
    const user = await User.getUser(params.id);
    const groups = await User.getUserGroup($auth.user.id);
    const notifications = await Notification.getNotifications();

    // User.getUserTwitterProfile(this.$route.params.id).then((res)=>{
    //   this.userTwitter=res;
    // });
    return {
      user,
      groups,
      notifications,
    };
  },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id);
  },
};
</script>

<style></style>
