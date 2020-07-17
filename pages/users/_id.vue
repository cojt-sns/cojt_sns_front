<template>
  <Main :user="user" :groups="groups" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';

export default {
  components: {
    Main,
  },
  async asyncData({ params, $auth }) {
    const user = await User.getUser(params.id);
    const groups = await User.getUserGroup($auth.user.id);
    // User.getUserTwitterProfile(this.$route.params.id).then((res)=>{
    //   this.userTwitter=res;
    // });
    return {
      user,
      groups,
    };
  },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id);
  },
};
</script>

<style></style>
