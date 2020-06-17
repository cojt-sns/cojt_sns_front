<template>
  <div class="column is-fullheight section has-background-info">
    <button class="button is-medium is-rounded">編集</button>
    <div class="image is-128x128 has-text-centered">
      <img :src="user.image" alt="" srcset="" />
    </div>
    <div class="title has-text-centered">{{ user.name }}</div>
    <ul class="has-text-centered">
      <li v-for="userTag in userTags" :key="userTag.id">#{{ userTag.name }}</li>
    </ul>
    <div class="has-text-centered">{{ user.bio }}</div>
    <!-- userのtwitter情報 -->
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    userTags: {
      type: Array,
      required: false,
      default: null,
    },
  },
};
</script>
<style></style>
