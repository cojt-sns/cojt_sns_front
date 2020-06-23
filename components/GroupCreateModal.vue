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
          <label class="label">
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item">Questions</div>
              </div>
              <div class="level-item level-right">
                <button class="button questions-btn" @click="AddQuestion">
                  質問項目を追加
                </button>
              </div>
            </nav>
          </label>
        </div>
        <div
          v-for="question in questions"
          :key="question.id"
          class="field is-grouped"
        >
          <div class="control is-expanded">
            <input
              v-model="question.text"
              class="input"
              placeholder="質問を入力"
            />
          </div>
          <div v-if="question.id != 1" class="control">
            <button class="button" @click="removeQuestion(question.id)">
              削除
            </button>
          </div>
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
      tracability: true,
      isPublic: true,
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
  watch: {
    create(newValue) {
      if (newValue) {
        this.tracability = true;
        this.isPublic = true;
        this.introduction = false;
        this.tags = [];
        this.questions = [
          {
            id: 1,
            text: '',
          },
        ];
        this.error = '';
      }
    },
  },
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
        const createdGroup = await Group.postGroup(
          this.isPublic,
          this.tracability,
          this.questions.map((question) => question.text),
          this.introduction,
          this.tags.map((tag) => tag.id)
        );
        this.$router.push('/groups/' + createdGroup.id);
      } catch (error) {
        this.error = error;
      }
    },

    removeQuestion(id) {
      const index = this.questions.findIndex((q) => q.id === id);
      if (index === -1) return;

      this.questions.splice(index, 1);
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
