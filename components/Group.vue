<template>
  <div class="column is-2 is-fullheight group-menu-wrapper">
    <GroupCreateModal :open="create" @close="SwitchGroupCreateModal" />
    <div class="header">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item title is-5">
            Groups
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span
              class="icon is-large has-text-primary"
              @click="SwitchGroupCreateModal"
              ><font-awesome-icon :icon="['fas', 'plus']" size="lg" />
            </span>
          </div>
        </div>
      </nav>
    </div>

    <aside class="menu">
      <ul class="menu-list">
        <li v-for="group in groups" :key="group.id">
          <nuxt-link
            :to="`/groups/${group.id}`"
            :class="{ 'is-active': isActive(group.id) }"
          >
            #{{ group.fullname }}
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import GroupCreateModal from '~/components/GroupCreateModal';
export default {
  components: {
    GroupCreateModal,
  },

  props: {
    groups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      create: false,
    };
  },

  mounted() {},

  methods: {
    isActive(id) {
      return (
        this.$route.name.includes('groups') &&
        id === Number(this.$route.params.id ?? 1)
      );
    },

    SwitchGroupCreateModal() {
      this.create = !this.create;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/_variables';
.column {
  border-right: 1px solid #dbdbdb;
  padding: 0;
  width: 300px !important;
  max-width: calc(80vw - 3rem);
  .header {
    border-bottom: 1px solid #dbdbdb;
    .level .level-left .level-item {
      margin-left: 10px;
    }
  }
  .menu {
    margin: 5px;
    .menu-label {
      color: inherit;
      font-size: inherit;
      display: inline-block;
    }
    .menu-list {
      li {
        a {
          transition: all 0.3s;
          &.is-active {
            color: $main-color;
            background-color: transparent;
            font-weight: bolder;
          }
        }
      }
    }
  }
  .icon {
    font-size: 1.5em;
    transition: all 0.3s;
    &:hover {
      background-color: #dbdbdb;
    }
  }
}
</style>
