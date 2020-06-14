<template>
  <div class="column is-fullheight section has-background-info">
    <button class="button is-medium is-rounded">編集</button>
    <div class="has-text-centered">{{ user.image }}</div>
    <div class="title has-text-centered">{{ user.name }}</div>
    <ul class="has-text-centered">
      <li v-for="userTag in userTags" :key="userTag.id">#{{ userTag.name }}</li>
    </ul>
    <div class="has-text-centered">{{ user.bio }}</div>
    <!-- userのtwitter情報 -->
  </div>
</template>

<script>
import User from '@/plugins/axios/modules/user';
export default {
  data() {
    return {
      user: {},
      userTags: {},
      userTwitter: {},
    };
  },
  created() {
    User.getUser(this.$route.params.id).then((res) => {
      this.user = res;
    });
    User.getUserTag(this.$route.params.id).then((res) => {
      this.userTags = res;
    });
    // User.getUserTwitterProfile(this.$route.params.id).then((res)=>{
    //   this.userTwitter=res;
    // });
  },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id);
  },
};
</script>
<style></style>
