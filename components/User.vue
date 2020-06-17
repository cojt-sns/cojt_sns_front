<template>
  <div class="column is-fullheight section has-background-info">
    <UserEditModal v-model="user_" :edit="edit" @close="closeModal()" />

    <!-- show profile -->
    <button class="button is-medium is-rounded" @click="openModal()">
      編集
    </button>
    <div class="image is-128x128 has-text-centered">
      <img :src="user_.image" alt srcset />
    </div>
    <div class="title has-text-centered">{{ user_.name }}</div>
    <ul class="has-text-centered">
      <li v-for="tag in user_.tags" :key="tag.id">#{{ tag.fullname }}</li>
    </ul>
    <div class="has-text-centered">{{ user_.bio }}</div>
    <!-- userのtwitter情報 -->
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
<style></style>
