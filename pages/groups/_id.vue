<template>
  <Main :posts="posts" :groups="groups" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import GroupUser from '@/plugins/axios/modules/groupUser';
import Post from '@/plugins/axios/modules/post';
import Group from '@/plugins/axios/modules/group';

export default {
  components: {
    Main,
  },
  async asyncData({ params, $auth }) {
    const groups = await User.getUserGroup($auth.user.id);
    if (!groups.some((g) => g.id === Number(params.id)))
      groups.push(await Group.getGroup(params.id));

    const posts = [];
    const res = await Post.getGroupPost(params.id);
    for (const post of res) {
      if (post.group_user_id == null) {
        post.user = {
          name: '削除されたユーザー',
          image: '/default.png',
          user_id: null,
        };
      } else {
        post.user = await GroupUser.getGroupUser(post.group_user_id);
      }
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
