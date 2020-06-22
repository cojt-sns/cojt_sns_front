<template>
  <div
    id="group"
    class="column is-2 is-narrow-mobile is-fullheight has-background-grey-lighter"
  >
    <GroupCreateModal :create="create" @close="SwitchGroupCreateModal" />
    <aside class="menu">
      <div class="menu-label">
        Groups
      </div>
      <span class="icon is-small" @click="SwitchGroupCreateModal"
        ><font-awesome-icon :icon="['fas', 'plus']" />
      </span>
      <ul class="menu-list">
        <li v-for="group in groups" :key="group.id">
          <nuxt-link
            :to="`/groups/${group.id}`"
            :class="{ 'is-active': isActive(group.id) }"
          >
            #{{ group.tags.map((tag) => tag.fullname).join('#') }}
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
      return id === Number(this.$route.params.id ?? 1);
    },

    SwitchGroupCreateModal() {
      this.create = !this.create;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
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
</style>
