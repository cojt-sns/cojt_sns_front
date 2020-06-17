<template>
  <Main :id="1" :posts="posts" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Post from '@/plugins/axios/modules/post';

export default {
  components: {
    Main,
  },
  async asyncData() {
    const posts = [];
    const res = await Post.getGroupPost(1);
    for (const post of res) {
      post.user = await User.getUser(post.user_id);
      post.user.image = process.env.SERVER_URL + post.user.image;
      posts.push(post);
    }
    return {
      posts,
    };
  },
  methods: {},
};
</script>

<style></style>
