<template>
  <Modal
    :class="{ 'is-active': open }"
    :title="'グループに参加'"
    @close="$emit('close')"
  >
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">#{{ group.fullname }}</div>
    <!-- <div class="title is-4 has-text-left">ユーザー名</div>
    <div class="field">
      <div class="control">
        <input
          v-model="name"
          class="input"
          type="text"
          placeholder="ユーザー名を入力"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">アイコン</label>
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
      <vue-croppie
        ref="croppieRef"
        :enable-orientation="true"
        :enable-resize="true"
        :boundary="{ width: 450, height: 300 }"
        :viewport="{ width: 200, height: 200, type: 'circle' }"
      ></vue-croppie>
    </div> -->
    <div class="columns">
      <div class="column is-3">
        <div class="image is-128x128 has-text-centered">
          <img :src="serverUrl + image" alt srcset />
        </div>
      </div>
      <div class="column">
        <div class="title is-4 has-text-left">ユーザー名</div>
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
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-primary" @click="join()">参加</button>
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
  props: {
    group: {
      type: Object,
      required: true,
    },
    user: {
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
      name: this.user.name,
      image: this.user.image,
      error: '',
      serverUrl: process.env.SERVER_URL,
      // filename: '',
      // filetype: '',
    };
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.name = this.user.name;
        this.image = this.user.image;
        this.error = '';
      }
    },
  },
  methods: {
    async join() {
      try {
        await Group.joinGroup(this.group.id, this.name);
        // location.href =
        //   this.process.env.BASE_URL + 'groups/' + String(this.group.id);
        this.$emit('close');
      } catch (error) {
        this.error = error;
        // this.error = 'エラー';
      }
    },
    // join() {
    //   const options = {
    //     type: 'blob',
    //     format: 'png',
    //     circle: true,
    //   };

    //   // 保存時に合わせてクロップする
    //   this.$refs.croppieRef.result(options, async (output) => {
    //     const file = new File([output], this.filename, {
    //       type: this.filetype,
    //     });

    //     await Group.joinGroup(this.group.id, this.name, file);

    //     // location.href =
    //     //   this.process.env.BASE_URL + 'groups/' + String(this.group.id);
    //     this.$emit('close');
    //   });
    // },
    // selectIcon(e) {
    //   e.preventDefault();
    //   this.filename = e.target.files.name;
    //   this.filetype = e.target.files.type;
    //   this.croppie(e);
    // },
    // croppie(e) {
    //   const files = e.target.files || e.dataTransfer.files;
    //   if (!files.length) return;

    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.$refs.croppieRef.bind({
    //       url: e.target.result,
    //     });
    //   };

    //   reader.readAsDataURL(files[0]);
    // },
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
