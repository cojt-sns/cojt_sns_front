<template>
  <div class="column is-fullheight section has-background-white	">
    <UserEditModal v-model="user_" :edit="edit" @close="closeModal()" />
    <!-- <LogoutModal /> -->
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
              @click="openModal()"
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
            @click="openModal()"
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

    <div class="is-divider" data-content="abcd">hellooooo</div>

    <div class="columns">
      <div class="column">Column 1</div>
      <div class="is-divider-vertical" data-content="OR"></div>
      <div class="column">
        Column 2 <br />
        Note: divider stretches to parent's height.
      </div>
    </div>

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
import UserEditModal from '~/components/UserEditModal';
export default {
  components: {
    UserEditModal,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      edit: false,
      user_: this.user,
      serverUrl: process.env.SERVER_URL,
    };
  },
  methods: {
    openModal() {
      this.edit = true;
    },
    closeModal() {
      this.edit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bulma-divider';

img {
  border-radius: 50%;
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
