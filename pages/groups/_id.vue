<template>
  <Main :posts="posts" :groups="groups" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import GroupUser from '@/plugins/axios/modules/groupUser';
import Post from '@/plugins/axios/modules/post';

export default {
  components: {
    Main,
  },
  async asyncData({ params, $auth }) {
    const groups = await User.getUserGroup($auth.user.id);

    const posts = [];
    const res = await Post.getGroupPost(params.id);
    for (const post of res) {
      post.user = await GroupUser.getGroupUser(post.group_user_id);
      posts.push(post);
    }

    return {
      posts,
      groups,
    };
  },
};
</script>

<style></style>
