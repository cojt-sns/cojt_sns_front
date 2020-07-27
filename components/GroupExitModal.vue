<template>
  <Modal :open="open" :title="'グループを脱退'" @close="$emit('close')">
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">
      #{{ group.fullname }}を抜けますか?
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <SingleSubmitButton class="button is-primary" :onclick="exit"
          >脱退</SingleSubmitButton
        >
      </div>
      <div class="control">
        <button class="button" @click="$emit('close')">戻る</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Group from '@/plugins/axios/modules/group';
import Modal from '@/components/Modal';
import SingleSubmitButton from '@/components/SingleSubmitButton';
export default {
  components: {
    Modal,
    SingleSubmitButton,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
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
    async exit() {
      try {
        await Group.leaveGroup(this.group.id);
        window.location.href = '/groups';
        return true;
      } catch (error) {
        this.error = error.data.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-card {
  overflow: visible;
  .modal-card-body {
    overflow: visible;
  }
}
</style>
