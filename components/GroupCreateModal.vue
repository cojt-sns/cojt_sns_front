<template>
  <Modal :open="open" :title="'グループを作成'" @close="$emit('close')">
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">名前を決める</div>
    <div class="field">
      <div class="control">
        <input
          v-model="name"
          class="input"
          type="text"
          placeholder="名前を入力"
        />
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-primary" @click="create()">作成</button>
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
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      error: '',
    };
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.name = '';
        this.error = '';
      }
    },
  },
  methods: {
    async create() {
      try {
        const createdGroup = await Group.postGroup(this.name);
        window.location.href = '/groups/' + createdGroup.id;
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
