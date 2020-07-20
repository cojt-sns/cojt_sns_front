<template>
  <div class="column is-fullheight has-background-white	">
    <UserEditModal v-model="user_" :edit="edit" @close="closeEdit()" />
    <LogoutModal :open="open" @close="closeLogout()" />
    <!-- show profile -->
    <div class="level">
      <div class="level-item kkk has-text-centered">
        <div class="image img_size has-text-centered heading">
          <img :src="serverUrl + user_.image" alt srcset />
        </div>
        <div class="title has-text-centered is-bold username">
          {{ user_.name }}
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button
            class="button is-medium is-primary is-outlined "
            @click="openEdit()"
          >
            編集
          </button>
        </div>
      </div>
    </div>
    <div class="level">
      <div class="level-item"></div>
      <div class="level-right">
        <div class="level-item">
          <button
            class="button is-medium is-primary is-outlined "
            @click="openLogout()"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
    <div class="subtitle has-text-centered is-size-4">
      参加グループ
    </div>
    <hr />
    <div class="groups">
      <GroupPanelList :groups="groups" />
    </div>
  </div>
</template>

<script>
import GroupPanelList from '@/components/GroupPanelList';
import UserEditModal from '~/components/UserEditModal';
import LogoutModal from '~/components/LogoutModal';
export default {
  components: {
    UserEditModal,
    GroupPanelList,
    LogoutModal,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    groups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      edit: false,
      open: false,
      user_: this.user,
      serverUrl: process.env.SERVER_URL,
    };
  },
  methods: {
    openEdit() {
      this.edit = true;
    },
    closeEdit() {
      this.edit = false;
    },
    openLogout() {
      this.open = true;
    },
    closeLogout() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;

  img {
    border-radius: 50%;
  }
  hr {
    margin: 12px;
  }
  .img_size {
    height: 200px;
    width: 200px;
  }
  .level-right {
    align-self: flex-start;
  }
  .kkk {
    display: flex;
    margin-left: 82px;
    flex-direction: column;
    justify-self: center;
  }
  .title {
    margin-top: 0.75rem;
    font-size: 3rem;
  }

  .groups {
    overflow-y: scroll;
  }
}
</style>
