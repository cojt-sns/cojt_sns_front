<template>
  <div class="column is-fullheight section has-background-white	">
    <UserEditModal v-model="user_" :edit="edit" @close="closeModal()" />
    <!-- show profile -->
    <div class="level top_level">
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

    <!-- eslint-disable-next-line -->
    <div class="has-text-left is-size-4">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="post-content">{{ user_.bio }}</div>
        </div>
      </div>
    </div>
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
