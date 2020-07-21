<template>
  <div class="column is-fullheight has-background-white	">
    <!-- <UserEditModal v-model="user_" :edit="edit" @close="closeEdit()" /> -->
    <LogoutModal :open="open" @close="closeLogout()" />
    <!-- show profile -->
    <div v-if="edit">
      <div class="level">
        <div class="level-item kkk has-text-centered">
          <!-- <div class="image img_size has-text-centered heading">
            <img :src="serverUrl + user_.image" alt srcset />
          </div> -->
          <input
            class="file-input"
            type="file"
            name="resume"
            ref="icon"
            @change="selectIcon"
          />
          <div class="image-edit has-text-centered heading">
            <img v-show="!imageEdit" :src="image" alt srcset />
            <vue-croppie
              v-show="imageEdit"
              ref="croppieRef"
              :enable-orientation="true"
              :enable-resize="false"
              :boundary="{ width: 200, height: 200 }"
              :viewport="{ width: 200, height: 200, type: 'circle' }"
            ></vue-croppie>
            <span
              class="icon edit"
              :class="{ 'has-text-white': imageEdit }"
              @click="!imageEdit ? $refs.icon.click() : crop()"
            >
              <font-awesome-icon :icon="['fas', 'edit']" size="lg" />
            </span>
          </div>
          <div class="title has-text-centered is-bold username">
            <div class="control">
              <input
                v-model="username"
                class="input"
                type="text"
                placeholder="名前を入力"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="level">
        <div class="level-item edit-ctlr is-centered">
          <button class="button is-medium is-primary " @click="save">
            保存
          </button>
          <button class="button is-medium" @click="switchEditMode()">
            戻る
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="level user-info">
        <div class="level-item kkk has-text-centered">
          <div class="image img_size has-text-centered heading">
            <img :src="serverUrl + user_.image" alt srcset />
          </div>
          <div class="title has-text-centered is-bold username">
            {{ user_.name }}
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button
              class="button is-medium is-primary is-outlined "
              @click="switchEditMode()"
            >
              編集
            </button>
          </div>
        </div>
      </div>
      <div class="level">
        <div class="level-item"></div>
        <div class="level-right">
          <div class="level-item">
            <button
              class="button is-primary is-outlined "
              @click="openLogout()"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ translucent: edit }">
      <div class="subtitle has-text-centered is-size-4">
        参加グループ
      </div>
      <hr />
      <div class="groups">
        <GroupPanelList :groups="groups" />
      </div>
    </div>
  </div>
</template>

<script>
import GroupPanelList from '@/components/GroupPanelList';
import LogoutModal from '~/components/LogoutModal';
import User from '@/plugins/axios/modules/user';

export default {
  components: {
    GroupPanelList,
    LogoutModal,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    groups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      edit: false,
      open: false,
      user_: this.user,
      username: this.user.name,
      serverUrl: process.env.SERVER_URL,
      image: process.env.SERVER_URL + this.user.image,
      imageEdit: false,
      filename: '',
      filetype: '',
    };
  },
  methods: {
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

          const res = await User.putUser(
            this.user.id,
            this.username,
            undefined,
            undefined,
            this.bio,
            file,
            undefined,
            undefined,
            undefined
          );

          this.user_ = res;
          this.image = res.image;
        });
      } catch (error) {
        this.error = error;
      }
    },
    crop() {
      const options = {
        format: 'png',
        circle: true,
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.image = output;
      });

      this.imageEdit = false;
    },
    selectIcon(e) {
      e.preventDefault();
      if (typeof e.target.files[0] === 'undefined') return;
      this.filename = e.target.files[0].name;
      this.filetype = e.target.files[0].type;
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
    switchEditMode() {
      this.edit = !this.edit;
    },
    openLogout() {
      this.open = true;
    },
    closeLogout() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;

  img {
    border-radius: 50%;
  }
  hr {
    margin: 12px;
  }
  .img_size {
    height: 200px;
    width: 200px;
  }
  .level-right {
    align-self: flex-start;
  }
  .kkk {
    display: flex;
    /* margin-left: 82px; */
    flex-direction: column;
    justify-self: center;
  }
  .title {
    margin-top: 0.75rem;
    font-size: 3rem;
  }

  .groups {
    overflow-y: scroll;
  }

  .image-edit {
    position: relative;
    margin: 0;
    img {
      border-radius: 50%;
    }

    & > *:not(img) {
      position: absolute;
    }

    .icon {
      z-index: 1000;
      &.edit {
        font-size: 4em;
        right: 0;
        bottom: 0;
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

  .edit-ctlr button {
    margin: 1rem 3rem;
  }

  .file-input {
    display: none;
  }

  .user-info {
    position: relative;

    .level-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .translucent {
    opacity: 0.5;
  }
}
</style>
