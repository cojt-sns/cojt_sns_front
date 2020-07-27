<template>
  <Main :groups="groups" :notifications="notifications">
    <div class="column is-fullheight">
      <div class="title has-text-centered">グループに参加しよう！</div>
      <GroupGraph class="graph" :groups="all" />
    </div>
  </Main>
</template>

<script>
import Main from '~/components/Main';
import User from '@/plugins/axios/modules/user';
import Group from '@/plugins/axios/modules/group';
import Notification from '@/plugins/axios/modules/notification';
import GroupGraph from '@/components/GroupGraph';

export default {
  components: {
    Main,
    GroupGraph,
  },
  async asyncData({ $auth, redirect, store }) {
    const groups = await User.getUserGroup($auth.user.id);
    const notifications = (await Notification.getNotifications()).reverse();

    if (groups.length === 0) {
      const all = await Group.searchGroup(null, null, -1);
      return {
        all,
        groups,
        notifications,
      };
    }

    const group = groups.find((g) => g.id === store.state.lastAccessGroupId);
    if (group) {
      redirect(`/groups/${group.id}`);
    } else {
      redirect(`/groups/${groups[0].id}`);
    }

    return {
      groups,
      notifications,
    };
  },
};
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
  padding: 0;
  .title {
    margin: 50px;
    margin-bottom: 5px;
  }
  .graph {
    flex: 1;
    overflow: hidden;
  }
}
</style>
