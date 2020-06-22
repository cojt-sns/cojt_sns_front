<template>
  <Main>
    <div class="column is-fullheight">
      <div v-for="(group, index) in groups" :key="group.id">
        <a @click="modalStates.splice(index, 1, true)"
          >#{{ group.tags.map((tag) => tag.fullname).join('#') }}</a
        >
        <GroupJoinModal
          :group="group"
          :active="modalStates[index]"
          @close="modalStates.splice(index, 1, false)"
        />
      </div>
    </div>
  </Main>
</template>

<script>
import Main from '~/components/Main';
import GroupJoinModal from '~/components/GroupJoinModal';
import Group from '@/plugins/axios/modules/group';
import Tag from '@/plugins/axios/modules/tag';

export default {
  components: {
    Main,
    GroupJoinModal,
  },
  async asyncData() {
    const groups = [];
    const modalStates = [];
    const search = await Group.searchGroup();
    for (const group of search) {
      const tags = [];
      for (const id of group.tags) {
        tags.push(await Tag.getTag(id));
      }
      group.tags = tags;
      groups.push(group);
      modalStates.push(false);
    }
    return {
      groups,
      modalStates,
    };
  },
  data() {
    return {
      modalStates: this.modalStates,
    };
  },
};
</script>

<style></style>
