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
              <span class="file-name">{{ icon ? icon.name : '' }}</span>
            </label>
          </div>
          <vue-croppie
            ref="croppieRef"
            :enableOrientation="true"
            :enableResize="true"
            :boundary="{ width: 450, height: 300 }"
            :viewport="{ width: 200, height: 200, type: 'circle' }"
          ></vue-croppie>
          <!-- <button class="button" @click="crop">決定</button>
          <img v-if="croppieImage" :src="croppieImage" />-->
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
          <!-- <TagInput v-model="tags" /> -->
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="crop">Save changes</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import User from '@/plugins/axios/modules/user';
// import TagInput from '~/components/TagInput';
export default {
  components: {
    // TagInput,
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
      tags: this.user.tags,
      bio: this.user.bio,
      error: '',
      filename: '',
      filetype: '',
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
    selectIcon(e) {
      e.preventDefault();
      this.filename = e.target.files.name;
      this.filetype = e.target.files.type;
      this.croppie(e);
    },
    save() {
      this.error = '';

      if (this.error) return;
      try {
        const options = {
          type: 'blob',
          format: 'png',
          circle: true,
        };

        // 保存時に合わせてクロップする
        this.$refs.croppieRef.result(options, async (output) => {
          const file = new File([output], this.filename, {
            type: this.filetype,
          });
          this.save();

          const res = await User.putUser(
            this.user.id,
            this.name,
            undefined,
            undefined,
            this.bio,
            file,
            undefined,
            undefined,
            undefined
          );

          const user = res;

          this.$emit('change-user', user);
          this.$emit('close');
        });
      } catch (error) {
        this.error = error;
      }
    },
    croppie(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
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
