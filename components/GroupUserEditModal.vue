<template>
  <div :class="{ 'is-active': whichmodal == 2 }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ group.name }}でのプロフィールの変更</p>
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
          <div class="content">
            <input v-model="name" class="input" placeholder="名前を入力" />
          </div>
        </div>
        <div class="field">
          <label class="label">icon</label>
          <div class="file has-name">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="resume"
                @change="selectIcon"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon :icon="['fas', 'upload']" />
                </span>
                <span class="file-label">Choose a file…</span>
              </span>
              <span class="file-name">{{ image ? image.name : '' }}</span>
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">質問への回答</label>
          <div class="content">
            <ol type="1">
              <li v-for="(question, index) in group.questions" :key="index">
                <p>Q:{{ question }}</p>
                <p>
                  <input
                    v-model="answers[index]"
                    class="input"
                    placeholder="質問を入力"
                  />
                </p>
              </li>
            </ol>
          </div>
        </div>
        <div v-if="group.introduction" class="field">
          <label class="label">自己紹介</label>
          <div class="content">
            <textarea
              v-model="introduction"
              class="textarea"
              type="text"
              rows="3"
            ></textarea>
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
    prop: 'groupuser',
    event: 'change-groupuser',
  },
  props: {
    groupuser: {
      type: Object,
      required: true,
    },
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
      name: this.groupuser.name,
      answers: this.groupuser.answers.slice(),
      introduction: this.groupuser.introduction,
      image: null,
      error: '',
    };
  },
  watch: {
    whichmodal(newValue) {
      if (newValue === 2) {
        this.name = this.groupuser.name;
        this.answers = this.groupuser.answers.slice();
        this.introduction = this.groupuser.introduction;
        this.image = null;
        this.error = '';
      }
    },
  },
  methods: {
    selectIcon(e) {
      e.preventDefault();
      const files = e.target.files;
      this.image = files[0];
    },
    async save() {
      this.error = '';
      if (this.image == null) this.image = this.groupuser.image;
      if (this.error) return;
      try {
        const res = await Group.putGroupUser(
          this.groupuser.id,
          this.name,
          this.answers,
          this.introduction,
          this.image
        );
        const groupuser = res;
        groupuser.image = process.env.SERVER_URL + groupuser.image;
        this.$emit('change-groupuser', res);
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
