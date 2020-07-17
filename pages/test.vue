<template>
  <Main>
    <GroupJoinModal
      :open="logout"
      :group="group"
      :user="user"
      @close="switchLogoutModal"
    />
  </Main>
</template>

<script>
import Main from '~/components/Main';
import GroupJoinModal from '~/components/GroupJoinModal';
import User from '@/plugins/axios/modules/user';
import Group from '@/plugins/axios/modules/group';
export default {
  components: {
    Main,
    GroupJoinModal,
  },
  async asyncData({ params, $auth }) {
    const group = await Group.getGroup(4);
    const user = await User.getUser(1);
    // User.getUserTwitterProfile(this.$route.params.id).then((res)=>{
    //   this.userTwitter=res;
    // });
    return {
      user,
      group,
    };
  },
  data() {
    return {
      logout: true,
    };
  },
  methods: {
    switchLogoutModal() {
      this.logout = !this.logout;
    },
  },
};
</script>

<style></style>
