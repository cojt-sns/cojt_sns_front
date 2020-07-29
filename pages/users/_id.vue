<template>
  <Main
    :user="user"
    :groups="groups"
    :assigned-group="assignedGroup"
    :notifications="notifications"
  />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Notification from '@/plugins/axios/modules/notification';

export default {
  middleware: 'auth',
  components: {
    Main,
  },
  async asyncData({ params, $auth, error }) {
    try {
      const user = await User.getUser(params.id);
      const groups = await User.getUserGroup($auth.user.id);
      const notifications = (await Notification.getNotifications()).reverse();

      try {
        const assignedGroup = await User.getUserGroup(params.id);
        return {
          user,
          groups,
          assignedGroup,
          notifications,
        };
      } catch (e) {}
      // User.getUserTwitterProfile(this.$route.params.id).then((res)=>{
      //   this.userTwitter=res;
      // });
      return {
        user,
        groups,
        notifications,
        assignedGroup: null,
      };
    } catch {
      error({
        statusCode: 404,
      });
    }
  },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id);
  },
};
</script>

<style></style>
