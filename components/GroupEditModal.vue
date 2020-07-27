<template>
  <Modal :open="open" :title="'グループを変更'" @close="$emit('close')">
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">名前を変更</div>
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
        <SingleSubmitButton class="button is-primary" :onclick="update"
          >変更</SingleSubmitButton
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
  model: {
    prop: 'group',
    event: 'change-group',
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
      name: this.group.name,
      error: '',
    };
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.name = this.group.name;
        this.error = '';
      }
    },
  },
  methods: {
    async update() {
      try {
        await Group.putGroup(this.group.id, this.name, this.group.parent_id);
        window.location.href = '/groups/' + this.group.id;
        return true;
      } catch (error) {
        this.error = error.data.message;
      }
    },
  },
};
</script>
