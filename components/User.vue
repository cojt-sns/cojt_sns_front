<template>
  <div class="column is-fullheight section has-background-white	">
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
      <div class="level">
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
    <div class="columns">
      <div class="column is-3 is-offset-4">
        <div class="subtitle has-text-centered is-size-4">
          参加グループ
        </div>
      </div>
    </div>
    <hr />
    <GroupPanelList :groups="groups" />

    <!-- <div class="level">
      <div class="level-right">
        <div class="level-item">
          <button
            class="button is-medium is-primary is-outlined "
            @click="openModal()"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div> -->
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
.columns {
  align-items: center;
}
.post-content {
  white-space: pre-line;
}
.level-right {
  align-self: flex-start;
}
.kkk {
  display: flex;
  flex-direction: column;
}
.title {
  margin-top: 0.75rem;
  font-size: 3rem;
}
</style>
