<template>
  <Modal
    :class="{ 'is-active': open }"
    :title="'グループを変更'"
    @close="$emit('close')"
  >
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
    <div
      class="field is-grouped is-grouped-cen tered has-addons has-addons-centered"
    >
      <div class="control">
        <button class="button is-primary" @click="update()">変更</button>
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
        const editGroup = await Group.putGroup(this.group.id, this.name);
        this.$emit('change-group', editGroup);
        this.$emit('close');
      } catch (error) {
        this.error = error.data.message.name[0];
      }
    },
    async save() {
      this.error = '';

      if (this.error) return;
      try {
        // console.log(
        //   this.introduction + 'in' + this.visible_profile + 'pu' + this.isPublic
        // );
        const res = await Group.putGroup(
          this.group.id,
          this.visible_profile,
          this.isPublic,
          this.questions.map((res) => {
            return res.text;
          }),
          this.introduction
        );

        const group = res;
        group.tags = this.group.tags;
        // console.log(group);
        this.$emit('change-group', group);
        this.$emit('close');
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
