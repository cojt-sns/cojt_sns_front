<template>
  <Main :is-group="false" :user="user" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';

export default {
  components: {
    Main,
  },
  async asyncData({ params, redirect }) {
    try {
      const resUser = await User.getUser(params.id);
      resUser.tags = await User.getUserTag(params.id);
      resUser.image = process.env.SERVER_URL + resUser.image;
      // User.getUserTwitterProfile(this.$route.params.id).then((res)=>{
      //   this.userTwitter=res;
      // });
      return {
        user: resUser,
      };
    } catch (error) {
      return redirect(302, '/');
    }
  },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id);
  },
};
</script>

<style></style>
