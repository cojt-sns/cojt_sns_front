<template>
  <Main>
    <LogoutModal :open="logout" @close="switchLogoutModal" />
  </Main>
</template>

<script>
import Main from '~/components/Main';
import LogoutModal from '~/components/LogoutModal';
export default {
  components: {
    Main,
    LogoutModal,
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
