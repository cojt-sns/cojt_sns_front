<template>
  <article class="tile is-4 is-child">
    <div class="box" @click="$router.push(`/groups/${group.id}`)">
      <p class="title has-text-weight-bold is-size-6 middle">
        #{{ group.fullname }}
      </p>
      <p class="content bot">TODO: description入れる</p>
      <article class="member">
        <span>
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
        <span>{{ group.member }}</span>
      </article>
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
  height: 20rem;
  cursor: pointer;
}
.member {
  margin-top: auto;
}
</style>
