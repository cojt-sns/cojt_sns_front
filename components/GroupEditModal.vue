<template>
  <div :class="{ 'is-active': whichmodal == 2 }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">#{{ group.fullname }}の編集</p>
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
              v-model="visible_profile"
              class="checkbox"
              type="checkbox"
              name="visible_profile"
            />
            VisibleProfile
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
            Introduction
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
        <button class="button is-success" @click="save">Save changes</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import Group from '@/plugins/axios/modules/group';
export default {
  model: {
    prop: 'group',
    event: 'change-group',
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
    whichmodal: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visible_profile: this.group.visible_profile,
      isPublic: this.group.public,
      introduction: this.group.introduction,
      questions: this.group.questions.map((text, i) => {
        return { id: i + 1, text };
      }),
      error: '',
    };
  },
  watch: {
    whichmodal(newValue) {
      if (newValue === 2) {
        this.visible_profile = this.group.visible_profile;
        this.isPublic = this.group.public;
        this.introduction = this.group.introduction;
        this.questions = this.group.questions.map((text, i) => {
          return { id: i + 1, text };
        });
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
    removeQuestion(id) {
      const index = this.questions.findIndex((q) => q.id === id);
      if (index === -1) return;

      this.questions.splice(index, 1);
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
