<template>
  <Modal :open="open" :title="'グループに参加'" @close="$emit('close')">
    <input
      ref="icon"
      class="file-input"
      type="file"
      name="resume"
      @change="selectIcon"
    />
    <div v-if="error" class="notification is-danger is-light">
      {{ error }}
    </div>
    <div class="title is-4 has-text-centered">#{{ group.fullname }}</div>
    <div>
      <div class="columns">
        <div class="column is-3">
          <div class="image is-128x128 has-text-centered">
            <img v-show="!imageEdit" :src="image" alt srcset />
            <vue-croppie
              v-if="imageEdit"
              ref="croppieRef"
              :enable-orientation="true"
              :enable-resize="false"
              :boundary="{ width: 128, height: 128 }"
              :viewport="{ width: 128, height: 128, type: 'circle' }"
            ></vue-croppie>
            <span
              class="icon edit"
              :class="{ 'has-text-white': imageEdit }"
              @click="!imageEdit ? $refs.icon.click() : crop()"
            >
              <font-awesome-icon
                v-if="!imageEdit"
                :icon="['fas', 'edit']"
                size="lg"
              />
              <font-awesome-icon v-else :icon="['fas', 'check']" size="lg" />
            </span>
            <span
              v-show="imageEdit"
              class="icon back has-text-white"
              @click="imageEdit = false"
            >
              <font-awesome-icon :icon="['fas', 'undo']" size="lg" />
            </span>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <div class="control">
              <label class="label">Name</label>
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
          <SingleSubmitButton class="button is-primary" :onclick="join"
            >参加</SingleSubmitButton
          >
        </div>
        <div class="control">
          <button class="button" @click="$emit('close')">戻る</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Group from '@/plugins/axios/modules/group';
import Modal from '@/components/Modal';
import SingleSubmitButton from '@/components/SingleSubmitButton';
export default {
  components: {
    Modal,
    SingleSubmitButton,
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
      name: this.$auth.user.name,
      image: process.env.SERVER_URL + this.$auth.user.image,
      imageEdit: false,
      error: '',
      serverUrl: process.env.SERVER_URL,
      myIcon: false,
      filename: '',
      filetype: '',
    };
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.name = this.$auth.user.name;
        this.image = this.serverUrl + this.$auth.user.image;
        this.error = '';
        this.imageEdit = false;
        this.myIcon = false;
      }
    },
  },
  methods: {
    async join() {
      if (this.imageEdit) {
        this.error = 'アイコン画像を確定してください';
        return;
      }
      try {
        if (this.myIcon) {
          await Group.joinGroup(this.group.id, this.name, this.file);
        } else {
          await Group.joinGroup(this.group.id, this.name);
        }
        location.href = '/groups/' + this.group.id;
        return true;
      } catch (error) {
        this.error = error;
      }
    },
    crop() {
      let options = {
        format: 'png',
        circle: true,
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.image = output;
      });

      options = {
        type: 'blob',
        format: 'png',
        circle: true,
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.file = new File([output], this.filename, {
          type: this.filetype,
        });
        this.myIcon = true;
      });

      this.imageEdit = false;
    },
    selectIcon(e) {
      e.preventDefault();
      this.filename = e.target.files[0]?.name;
      this.filetype = e.target.files[0]?.type;
      this.croppie(e);
    },
    croppie(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.imageEdit = true;
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
.image {
  position: relative;
  img {
    border-radius: 50%;
  }

  & > * {
    position: absolute;
  }

  .icon {
    z-index: 1000;
    &.edit {
      right: 0px;
      bottom: 0px;
    }
    &.back {
      left: 0px;
      bottom: 0px;
    }
    &:hover {
      color: #818181;
    }
    &.has-text-white:hover {
      color: #d8d8d8 !important;
    }
  }
}

.image-edit-enter-active,
.image-edit-leave-active {
  transition: opacity 0.5s ease;
}
.image-edit-enter,
.image-edit-leave-to {
  opacity: 0;
}

.file-input {
  display: none;
}
</style>
