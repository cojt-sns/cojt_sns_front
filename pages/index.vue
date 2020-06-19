<template>
  <div class="container">
    <Menu />//
    <GroupJoinModal
      :group="group"
      :join="true"
      :user_id="$auth.user.id"
      :tags="tags"
    />
    <div>
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
      <div>tag: {{ group.tags }}</div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Group from '@/plugins/axios/modules/group';
import Tag from '@/plugins/axios/modules/tag';
import Menu from '~/components/Menu.vue';
import GroupJoinModal from '~/components/GroupJoinModal.vue';
export default {
  components: {
    Logo,
    Menu,
    GroupJoinModal,
  },
  data() {
    return {
      healthCheck: 0,
      tags: [],
      group: {},
    };
  },
  created() {
    this.getHealthCheck();
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
      await Group.getGroup(2).then((res) => {
        this.group = res;
      });
      this.tags = await this.group.tags.map(
        async (value) => await Tag.getTag(value)
      );
      console.log(this.tags);
      console.log(this.group);
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
