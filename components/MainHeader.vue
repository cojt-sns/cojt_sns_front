<template>
  <div>
    <transition name="side-background">
      <div
        class="side-background"
        v-if="sideMenu"
        @click="sideMenu = false"
      ></div>
    </transition>
    <transition name="side-menu">
      <div
        v-if="sideMenu"
        class="mobile-side is-mobile columns has-background-white"
      >
        <Menu />
        <Group :groups="groups" />
      </div>
    </transition>
    <div class="header">
      <nav class="level is-mobile">
        <div class="level-left">
          <div v-if="$device.isMobile" class="level-item">
            <span
              class="icon is-large has-text-primary"
              @click="sideMenu = !sideMenu"
            >
              <font-awesome-icon :icon="['fa', 'bars']" size="lg" />
            </span>
          </div>
          <div class="level-item title is-5">
            {{ title }}
          </div>
        </div>
        <div class="level-right">
          <slot />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Menu';
import Group from '~/components/Group';
export default {
  components: {
    Menu,
    Group,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    groups: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      sideMenu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.header .level {
  .level-left {
    width: calc(100% - 48px);
    .level-item {
      flex-grow: 0;
      margin: 0;
      &.title {
        display: block;
      }
      &:first-child.title {
        margin-left: 10px;
      }
      max-width: calc(100% - 48px);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  border-bottom: 1px solid #dbdbdb;
}

.side-background {
  z-index: 4000;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(#000000, 0.5);
}

.mobile-side {
  z-index: 5000;
  position: fixed;
  height: 100vh;
  margin: 0;
}

.side-background-enter-active,
.side-background-leave-active {
  transition: opacity 0.5s;
}

.side-background-enter,
.side-background-leave-to {
  opacity: 0;
}

.side-menu-enter-active,
.side-menu-leave-active {
  left: 0px;
  transition: left 0.5s;
}

.side-menu-enter,
.side-menu-leave-to {
  left: -100vw;
}
</style>
