<template>
  <Main>
    <div class="column is-fullheight section">
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
    </div>
  </Main>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Main from '~/components/Main';

export default {
  components: {
    Logo,
    Main,
  },
  data() {
    return {
      healthCheck: 0,
    };
  },
  created() {
    this.getHealthCheck();
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
