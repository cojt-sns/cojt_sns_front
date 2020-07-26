<template>
  <Main
    :posts="posts"
    :groups="groups"
    :group-user="groupUser"
    :notifications="notifications"
  />
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import GroupUser from '@/plugins/axios/modules/groupUser';
import Post from '@/plugins/axios/modules/post';
import Group from '@/plugins/axios/modules/group';
import Notification from '@/plugins/axios/modules/notification';

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
      for (const child of post.thread) {
        if (child.group_user_id == null) {
          child.user = {
            name: '削除されたユーザー',
            image: '/default.png',
            user_id: null,
          };
        } else {
          child.user = await GroupUser.getGroupUser(child.group_user_id);
        }
      }
      posts.push(post);
    }

    const notifications = (await Notification.getNotifications()).reverse();

    try {
      const groupUser = await Group.getGroupLoginMember(params.id);

      return {
        groupUser,
        posts,
        groups,
        notifications,
      };
    } catch (error) {}

    return {
      groupUser: null,
      posts,
      groups,
      notifications,
    };
  },
};
</script>

<style></style>
