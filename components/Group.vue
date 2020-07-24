<template>
  <div class="column is-2 is-fullheight">
    <GroupCreateModal :open="create" @close="SwitchGroupCreateModal" />
    <div class="header has-background-primary">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item title is-5 has-text-white">
            Groups
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span
              class="icon is-large has-text-white"
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
.column {
  padding: 0;
  width: 300px !important;
  max-width: calc(80vw - 3rem);
  .header {
    .level .level-left .level-item {
      margin-left: 10px;
    }
  }
  .menu {
    margin: 5px;
    position: relative;
    .menu-label {
      color: inherit;
      font-size: inherit;
      display: inline-block;
    }
    .icon {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 1.5em;
    }
    .menu-list {
      li {
        a {
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>
