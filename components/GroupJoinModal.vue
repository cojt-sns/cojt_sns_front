<template>
  <div :class="{ 'is-active': active }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <strong
            >#{{ group.tags.map((tag) => tag.fullname).join('#') }}</strong
          >
          に参加する
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <div v-if="error" class="notification is-danger is-light">
          {{ error }}
        </div>

        <div class="field">
          <label class="label">名前</label>
          <p class="control has-icons-right">
            <input v-model="name" class="input" type="text" />
            <span class="icon is-small is-right">
              <font-awesome-icon :icon="['fas', 'check']" />
            </span>
          </p>
        </div>

        <!-- 質問の答えの入力 -->
        <div v-for="(question, index) in group.questions" :key="index">
          <div class="field">
            <label class="label">{{ question }}</label>
            <p class="control has-icons-right">
              <input v-model="answer[index]" class="input" type="text" />
              <span class="icon is-small is-right">
                <font-awesome-icon :icon="['fas', 'check']" />
              </span>
            </p>
          </div>
        </div>

        <!-- 自己紹介の編集 -->
        <div v-if="group.introduction" class="field">
          <label class="label">自己紹介を入力したください</label>
          <p class="control has-icons-right">
            <textarea
              v-model="bio"
              class="textarea"
              type="text"
              rows="3"
            ></textarea>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="joinGroup">Join</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import Group from '@/plugins/axios/modules/group';
export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: this.$auth.user.name,
      error: '',
      bio: '',
      answer: [],
    };
  },
  methods: {
    async joinGroup() {
      this.error = '';

      try {
        if (this.group.introduction) {
          await Group.joinGroup(
            this.group.id,
            this.$auth.user.id,
            this.name,
            this.answer,
            this.bio
          );
        } else {
          await Group.joinGroup(
            this.group.id,
            this.$auth.user.id,
            this.name,
            this.answer
          );
        }
        this.$emit('close');
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-card-title {
  flex: 1;
}
</style>
