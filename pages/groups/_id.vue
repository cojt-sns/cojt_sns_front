<template>
  <Main :posts="posts" :groups="groups" />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import GroupUser from '@/plugins/axios/modules/groupUser';
import Post from '@/plugins/axios/modules/post';
// import Tag from '@/plugins/axios/modules/tag';

export default {
  components: {
    Main,
  },
  async asyncData({ params, $auth }) {
    const groups = [];
    const userGroups = await User.getUserGroup($auth.user.id);
    for (const group of userGroups) {
      const tags = [];
      // for (const id of group.tags) {
      //   tags.push(await Tag.getTag(id));
      // }
      group.tags = tags;
      groups.push(group);
    }

    if (groups.length <= 0) {
      return {
        groups,
      };
    }

    const posts = [];
    const res = await Post.getGroupPost(params.id);
    for (const post of res) {
      post.user = await GroupUser.getGroupUser(post.group_user_id);
      post.user.image = process.env.SERVER_URL + post.user.image;
      posts.push(post);
    }

    return {
      posts,
      groups,
    };
  },
  methods: {},
};
</script>

<style></style>
