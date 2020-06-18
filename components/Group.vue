<template>
  <div
    id="group"
    class="column is-2 is-narrow-mobile is-fullheight section has-background-grey"
  >
    <aside class="menu">
      <p class="menu-label">Groups</p>
      <ul class="menu-list">
        <li v-for="group in groups" :key="group.id">
          <a :value="group.id" @click="OnGroupClicked">{{
            group.tags
              .map((tag) => {
                return tag.name;
              })
              .join('.')
          }}</a>
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
    return {
      current_id: 0,
    };
  },

  mounted() {},

  methods: {
    OnGroupClicked(e) {
      this.$emit('GroupClicked', e.target.getAttribute('value'));
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
