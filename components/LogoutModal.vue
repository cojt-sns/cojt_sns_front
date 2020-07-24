<template>
  <Modal
    :class="{ 'is-active': open }"
    :title="'ログアウト'"
    @close="$emit('close')"
  >
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">ログアウト</div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-primary" @click="logout()">ログアウト</button>
      </div>
      <div class="control">
        <button class="button" @click="$emit('close')">戻る</button>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from '@/components/Modal';
export default {
  components: {
    Modal,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      error: '',
    };
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.error = '';
      }
    },
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        location.href = '/';
      } catch (error) {
        this.error = error.date.message;
      }
    },
  },
};
</script>
