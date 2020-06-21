<template>
  <div :class="{ 'is-active': create }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">グループを作成</p>
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
          <label class="label">タグ</label>
          <TagInput v-model="tags" />
        </div>
        <div class="field">
          <label class="label">
            <input
              v-model="tracability"
              class="checkbox"
              type="checkbox"
              name="tracability"
            />
            Twitter Tracability
          </label>
        </div>
        <div class="field">
          <label class="label">
            <input
              v-model="isPublic"
              class="checkbox"
              type="checkbox"
              name="public"
            />
            Public
          </label>
        </div>
        <div class="field">
          <label class="label">
            <input
              v-model="introduction"
              class="introduction"
              type="checkbox"
              name="introduction"
            />
            自己紹介欄の有無
          </label>
        </div>
        <div class="field">
          <label class="label"
            >Questions
            <button class="button questions-btn" @click="AddQuestion">
              質問項目を追加
            </button>
          </label>
          <textarea
            v-for="question in questions"
            :key="question.id"
            v-model="question.text"
            class="textarea questions"
            placeholder="質問を入力"
            rows="1"
          ></textarea>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">Create Group</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Group from '@/plugins/axios/modules/group';
import TagInput from '~/components/TagInput';
export default {
  components: {
    TagInput,
  },
  props: {
    create: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tracability: false,
      isPublic: false,
      introduction: false,
      tags: [],
      questions: [
        {
          id: 1,
          text: '',
        },
      ],
      error: '',
    };
  },
  watch: {},
  methods: {
    AddQuestion() {
      const newQuestion = {
        id: this.questions[this.questions.length - 1].id + 1,
        text: '',
      };
      this.questions.push(newQuestion);
    },

    async save() {
      this.error = '';

      if (this.error) return;
      try {
        const res = await Group.postGroup(
          this.tracability,
          this.questions.map((question) => question.text),
          this.introduction,
          this.tags.map((tag) => tag.id)
        );
        const createdGroup = await res;
        await Group.joinGroup(createdGroup.id, this.$auth.user.id);
        this.$router.push('/groups/' + createdGroup.id);
      } catch (error) {
        this.error = error;
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
    .field {
      .questions {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
