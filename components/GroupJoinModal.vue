<template>
  <div :class="{ 'is-active': join }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          #{{ tags.map((tag) => tag.fullname).join('#') }}
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

        <!-- 質問の答えの入力 -->
        <div v-for="(question, index) in group.questions" :key="index">
          <div class="field">
            <label class="label">{{ question }}</label>
            <p class="control has-icons-right">
              <input v-model="answer[index]" class="input" type="text" />
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
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
        <button class="button is-success">Join Group</button>
        <button class="button" @click="$emit('close')">Clear</button>
      </footer>
    </div>
  </div>
</template>
<script>
import Group from '@/plugins/axios/modules/group';
export default {
  props: {
    join: {
      type: Boolean,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      error: '',
      bio: '',
      answer: [],
    };
  },
  methods: {
    async joinGroup() {
      this.error = '';

      if (this.error) return;
      try {
        if (this.group.introduction) {
          await Group.joinGroup(
            this.group.id,
            this.user_id,
            this.answer,
            this.bio
          );
        } else {
          await Group.joinGroup(this.group.id, this.user_id, this.answer);
        }
        this.$emit('close');
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
