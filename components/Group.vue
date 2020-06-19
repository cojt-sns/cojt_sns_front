<template>
  <div
    id="group"
    class="column is-2 is-narrow-mobile is-fullheight has-background-grey-lighter"
  >
    <aside class="menu">
      <p class="menu-label">Groups</p>
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
export default {
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    isActive(id) {
      return id === Number(this.$route.params.id ?? 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  .menu-label {
    color: inherit;
    font-size: inherit;
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
