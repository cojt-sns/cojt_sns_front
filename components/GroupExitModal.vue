<template>
  <Modal
    :class="{ 'is-active': open }"
    :title="'グループを脱退'"
    @close="$emit('close')"
  >
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">
      #{{ group.fullname }}を抜けますか?
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-primary" @click="exit()">脱退</button>
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
export default {
  components: {
    Modal,
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
        this.$emit('close');
        // window.location.href =
      } catch (error) {
        // this.error = error.data.message.name[0];
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
