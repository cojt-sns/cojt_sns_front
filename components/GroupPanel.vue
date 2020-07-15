<template>
  <article class="tile is-child box top is-4">
    <div class="section">
      <p class="title has-text-weight-bold is-size-6 middle">{{ groupName }}</p>
      <p class="content bot">{{ description }}</p>
    </div>
    <article class="member">
      <span>
        <font-awesome-icon :icon="['fas', 'user']" />
      </span>
      <span>{{ groupMemberNumber }}</span>
    </article>
  </article>
</template>

<script>
export default {
  components: {},
  props: {
    groupName: {
      type: String,
      required: true,
    },
    groupMemberNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.top {
  margin: 0.25rem !important;
  height: 11.5rem;
}
.middle {
  margin-bottom: 0.5rem;
}
.bot {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.box {
  padding: 0;
}
.member {
  margin-top: auto;
}
</style>
