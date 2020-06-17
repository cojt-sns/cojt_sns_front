<template>
  <div :class="{ 'is-active': edit }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">編集</p>
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

        <!-- 名前の編集 -->
        <div class="field">
          <label class="label">Name</label>
          <p class="control has-icons-right">
            <input v-model="name" class="input" type="text" />
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>

        <!-- アイコンの編集 -->
        <div class="field">
          <label class="label">icon</label>
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon :icon="['fas', 'upload']" />
                </span>
                <span class="file-label">Choose a file…</span>
              </span>
              <span class="file-name"></span>
            </label>
          </div>
        </div>

        <!-- 自己紹介の編集 -->
        <div class="field">
          <label class="label">自己紹介</label>
          <p class="control has-icons-right">
            <textarea
              v-model="bio"
              class="textarea"
              type="text"
              rows="3"
            ></textarea>
          </p>
        </div>

        <div class="field">
          <label class="label">タグ</label>
          <TagInput v-model="tags" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">
          Save changes
        </button>
        <button class="button" @click="this.$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import User from '@/plugins/axios/modules/user';
import TagInput from '~/components/TagInput';
export default {
  components: {
    TagInput,
  },
  model: {
    prop: 'user',
    event: 'change-user',
  },
  props: {
    edit: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.user.name,
      icon: '',
      tags: this.user.tags,
      bio: this.user.bio,
      error: '',
    };
  },
  watch: {
    edit(newValue) {
      if (!newValue) return;

      this.name = this.user.name;
      this.icon = null;
      this.tags = this.user.tags;
      this.bio = this.user.bio;
      this.error = '';
    },
  },
  methods: {
    async save() {
      this.error = '';

      if (this.error) return;
      try {
        const res = await User.putUser(
          this.user.id,
          this.name,
          undefined,
          undefined,
          this.bio,
          this.image,
          undefined,
          undefined,
          this.tags.map((tag) => tag.id)
        );

        const user = res;
        user.image = process.env.SERVER_URL + user.image;
        user.tags = await User.getUserTag(this.user.id);

        this.$emit('change-user', user);
        this.$emit('close');
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
  }
}
</style>
