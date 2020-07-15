<template>
  <Maintest :posts="posts" :groups="groups" :panels="panels" />
</template>

<script>
import Maintest from '~/components/Maintest';
import User from '@/plugins/axios/modules/user';
import GroupUser from '@/plugins/axios/modules/groupUser';
import Post from '@/plugins/axios/modules/post';
import Tag from '@/plugins/axios/modules/tag';

export default {
  components: {
    Maintest,
  },
  async asyncData({ $auth }) {
    const groups = [];
    const userGroups = await User.getUserGroup($auth.user.id);
    for (const group of userGroups) {
      const tags = [];
      for (const id of group.tags) {
        tags.push(await Tag.getTag(id));
      }
      group.tags = tags;
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
  data() {
    return {
      panels: [
        {
          name: 'Hello1',
          description: 'this is a test script',
          number: 100,
        },
        { name: 'Hello2', description: 'this is a test script', number: 200 },
        { name: 'Hello3', description: 'this is a test script', number: 300 },
        { name: 'Hello4', description: 'this is a test script', number: 400 },
        { name: 'Hello5', description: 'this is a test script', number: 500 },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
