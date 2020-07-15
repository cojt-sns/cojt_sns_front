<template>
  <Main :groups="groups" :search="search" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Group from '@/plugins/axios/modules/group';

export default {
  watchQuery: true,
  components: {
    Main,
  },
  async asyncData({ query, params, $auth }) {
    console.log('hoge');
    const groups = await User.getUserGroup($auth.user.id);
    let search = [];
    if (query.keywords) {
      search = await Group.searchGroup(query.keywords);
    }
    return {
      groups,
      search,
    };
  },
};
</script>

<style></style>
