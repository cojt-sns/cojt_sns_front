<template>
  <article class="tile is-child">
    <div class="box" @click="$router.push(`/groups/${group.id}`)">
      <a class="title has-text-primary has-text-weight-bold is-size-6 middle">
        #{{ group.fullname }}
      </a>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Score</p>
            <p class="title">{{ group.score.toFixed(2) }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Frequency</p>
            <p class="title is-4">{{ group.frequency.toFixed(2) }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Depth</p>
            <p class="title is-4">{{ group.depth_score.toFixed(2) }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Independency</p>
            <p class="title is-4">{{ group.independency.toFixed(2) }}</p>
          </div>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
export default {
  components: {},
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 6px 3px rgba(114, 114, 114, 0.1);
  // border: 1px solid #dbdbdb;
}
.member {
  margin-top: auto;
}
</style>
