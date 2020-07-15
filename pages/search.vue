<template>
  <Main :groups="groups" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';

export default {
  components: {
    Main,
  },
  async asyncData({ params, $auth }) {
    const groups = await User.getUserGroup($auth.user.id);

    return {
      groups,
    };
  },
};
</script>

<style></style>
