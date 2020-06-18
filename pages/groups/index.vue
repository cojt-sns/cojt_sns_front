<template>
  <Main
    :id="1"
    :posts="posts"
    :groups="groups"
    @GroupClicked="OnGroupClicked"
  />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Post from '@/plugins/axios/modules/post';
import Tag from '@/plugins/axios/modules/tag';

export default {
  components: {
    Main,
  },
  async asyncData() {
    const groups = [];
    const userGroups = await User.getUserGroup(1);
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
      post.user = await User.getUser(post.user_id);
      post.user.image = process.env.SERVER_URL + post.user.image;
      posts.push(post);
    }

    return {
      posts,
      groups,
    };
  },
  methods: {
    async GetPosts(id) {
      const newPosts = [];
      const res = await Post.getGroupPost(id);
      for (const post of res) {
        post.user = await User.getUser(post.user_id);
        post.user.image = process.env.SERVER_URL + post.user.image;
        newPosts.push(post);
      }
      this.posts = newPosts;
    },

    OnGroupClicked(id) {
      this.GetPosts(id);
    },
  },
};
</script>

<style></style>
