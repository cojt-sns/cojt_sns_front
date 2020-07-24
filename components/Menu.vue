<template>
  <div
    class="column is-2 is-narrow-mobile is-fullheight is-hidden-mobile menu-container"
  >
    <aside class="menu">
      <ul class="menu-list top">
        <li>
          <nuxt-link
            to="/groups"
            :class="{ 'is-active': $route.name.includes('groups') }"
          >
            <span class="icon is-medium">
              <font-awesome-icon :icon="['fas', 'home']" size="2x" />
            </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/search"
            :class="{ 'is-active': $route.name == 'search' }"
          >
            <span class="icon is-medium">
              <font-awesome-icon :icon="['fas', 'search']" size="2x" />
            </span>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list bottom">
        <li>
          <nuxt-link
            v-if="$auth.loggedIn"
            :to="`/users/${$auth.user.id}`"
            :class="{ 'is-active': $route.name.includes('users') }"
          >
            <figure class="image is-48x48">
              <img :src="serverUrl + $auth.user.image" />
            </figure>
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return { serverUrl: process.env.SERVER_URL };
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        window.location.href = '/first';
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/_variables';

.is-vertical-center {
  display: flex;
  align-items: center;
}
.menu-container {
  width: 4em !important;
  height: 100vh;
  padding: 0;
  border-right: 1px solid #dbdbdb;
  .menu {
    height: 100%;
    display: flex;
    flex-direction: column;

    .menu-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      li {
        margin-bottom: 5px;
        a.is-active {
          color: $main-color;
          background-color: transparent;
        }
      }
    }

    .menu-list.top {
      margin-top: 15px;
    }

    .menu-list.bottom {
      flex: 1;
      justify-content: flex-end;
      margin-bottom: 15px;
      li a {
        padding: 0;
        figure img {
          border-radius: 50%;
        }
        &.is-active {
          border: 2px solid $main-color;
          border-radius: 50%;
        }
        &:not(.is-active) img {
          transition: all 0.3s;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
