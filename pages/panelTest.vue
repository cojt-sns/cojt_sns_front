<template>
  <Main :posts="posts" :groups="groups">
    <GroupPanelList :groups="groups" />
  </Main>
</template>

<script>
import Main from '~/components/Main';
import GroupPanelList from '~/components/GroupPanelList';
import User from '@/plugins/axios/modules/user';
import GroupUser from '@/plugins/axios/modules/groupUser';
import Post from '@/plugins/axios/modules/post';

export default {
  components: {
    Main,
    GroupPanelList,
  },
  async asyncData({ $auth }) {
    const groups = [];
    const userGroups = await User.getUserGroup($auth.user.id);
    for (const group of userGroups) {
      groups.push(group);
    }

    if (groups.length <= 0) {
      return {
        groups,
      };
    }

    const posts = [];
    const res = await Post.getGroupPost(groups[0].id);
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

<style lang="scss" scoped></style>
