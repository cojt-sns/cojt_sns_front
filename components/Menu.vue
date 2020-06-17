<template>
  <div
    class="menu-container column is-2 is-narrow-mobile is-fullheight is-hidden-mobile"
  >
    <aside class="menu">
      <ul class="menu-list ">
        <li>
          <nuxt-link to="/" :class="{ 'is-active': $route.name == 'index' }">
            ホーム
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/groups"
            :class="{ 'is-active': $route.name.includes('groups') }"
          >
            チャット
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/search"
            :class="{ 'is-active': $route.name == 'search' }"
          >
            探索
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            v-if="$auth.loggedIn"
            :to="`/users/${$auth.user.id}`"
            :class="{ 'is-active': $route.name.includes('users') }"
          >
            プロフィール
          </nuxt-link>
        </li>
        <li>
          <a v-if="$auth.loggedIn" @click="logout">
            ログアウト
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        this.error = error;
      }
      this.$router.push('/first');
    },
  },
};
</script>

<style lang="scss" scoped>
.is-vertical-center {
  display: flex;
  align-items: center;
}
.menu-container {
  border-right: 1px black solid;
  height: 100vh;
  .menu {
    margin-top: 40vh;
  }
}
</style>
