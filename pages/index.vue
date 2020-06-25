<template>
  <Main>
    <div class="column is-fullheight section">
      <GroupUserModal :groupuser="tags" :group="group" :isshow="true" />
      <logo />
      <h1 class="title">cojt_sns_front</h1>
      <h2 class="subtitle">COJT SNS のフロント</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green"
          >Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
      <div>Check: {{ healthCheck }}</div>
      <div>Check: {{ $auth.loggedIn }}</div>
      <div>tag: {{ tags }}</div>
      <div>tag: {{ group }}</div>
    </div>
  </Main>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Main from '~/components/Main';
import Group from '@/plugins/axios/modules/group';
import GroupUserModal from '~/components/GroupUserModal';
export default {
  components: {
    Logo,
    Main,
    GroupUserModal,
  },
  data() {
    return {
      healthCheck: 0,
      tags: {},
      group: {},
    };
  },
  created() {
    this.getHealthCheck();
    // Group.putGroupUser(
    //   3,
    //   'suzu',
    //   ['100h', '2019'],
    //   'スマブラ世界ランカー',
    //   '/neko.png'
    // ).then((res) => {
    //   this.tags = res;
    // });
    // Group.getGroupMember(10).then((res) => {
    //   this.tags = res;
    // });
    // Group.getGroup(1).then((res) => {
    //   this.group = res;
    // });
    // Group.getPublicGroupUser(1).then((res) => {
    //   this.tags = res;
    // });
    this.getData();
  },
  methods: {
    async getHealthCheck() {
      try {
        const res = await this.$axios.$get('/health_check');
        this.health_check = res;
      } catch (error) {
        this.health_check = error;
      }
    },
    async getData() {
      this.tags = await Group.getGroupUser(1);
      this.group = await Group.getGroup(1);
    },
  },
};
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
