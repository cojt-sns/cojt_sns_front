<template>
  <div class="column is-fullheight section has-background-info">
    <!-- modal for editing profile -->
    <div class="modal" :class="{ 'is-active': this.edit == true }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">編集</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal()"
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
          <label class="label">icon</label>
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">Choose a file…</span>
              </span>
              <span class="file-name"
                >Screen Shot 2017-07-29 at 15.54.25.png</span
              >
            </label>
          </div>
          <!-- タグの編集 -->
          <div v-for="(tag, i) in editTags" :key="tag.id" class="tagsForm">
            <div class="field">
              <label class="label">タグ{{ i + 1 }}</label>
              <p class="control has-icons-right">
                <input v-model="editTags[i].name" class="input" type="text" />
              </p>
            </div>
          </div>
          <!-- タグの追加用ボタン -->
          <button class="button is-small" @click="addTagForm">
            タグを追加
          </button>

          <!-- 自己紹介の編集 -->
          <div class="field">
            <p>自己紹介</p>
            <p class="control has-icons-right">
              <textarea v-model="bio" class="input" type="text"></textarea>
            </p>
          </div>

          <!-- メールアドレスの確認 -->
          <!-- <div class="field">
            <label class="label">email</label>
            <p class="control has-icons-right">
              <input v-model="email" class="input" type="text" />
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>-->
          <!-- パスワードの確認 -->
          <!-- <div class="field">
            <label class="label">password</label>
            <p class="control has-icons-right">
              <input v-model="password" class="input" type="text" />
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>-->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="editProfile">
            Save changes
          </button>
          <button class="button" @click="resetInfo">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- show profile -->
    <button class="button is-medium is-rounded" @click="openModal()">
      編集
    </button>
    <div class="image is-128x128 has-text-centered">
      <img :src="user.image" alt srcset />
    </div>
    <div class="title has-text-centered">{{ user.name }}</div>
    <ul class="has-text-centered">
      <li v-for="tag in tags" :key="tag.id">#{{ tag.name }}</li>
    </ul>
    <div class="has-text-centered">{{ user.bio }}</div>
    <!-- userのtwitter情報 -->
  </div>
</template>

<script>
import User from '@/plugins/axios/modules/user';
import Tag from '@/plugins/axios/modules/tag';
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    userTags: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      edit: false,
      name: this.user.name,
      icon: '',
      tags: [],
      bio: this.user.bio,
      sendTag_ids: [],
      tagInfo: {},
      editTags: [],
      error: '',
    };
  },
  created() {
    this.userTags.forEach((userTag, i) => {
      this.tags.push({ id: i, name: userTag.name });
    });
    this.editTags = JSON.parse(JSON.stringify(this.tags));
  },
  methods: {
    openModal() {
      this.edit = true;
      this.resetInfo();
    },
    closeModal() {
      this.edit = false;
    },
    resetInfo() {
      this.name = this.user.name;
      this.icon = '';
      this.bio = this.user.bio;
      this.editTags = JSON.parse(JSON.stringify(this.tags));
    },
    addTagForm() {
      this.editTags.push({
        id: this.editTags.length,
        name: null,
      });
    },
    // editProfile() {
    //   this.tag_ids = [];
    //   this.editTags.forEach((tag, i) => {
    //     this.tagInfo = Tag.searchTag(tag.name, 0);
    //     if (this.tagInfo.length !== 1) {
    //       this.sendTagInfo.push(this.tagInfo);
    //       console.log(this.tagInfo.size);
    //     } else {
    //       this.error = '#' + tag[i + 1].nameは + 'は存在しないタグです。';
    //     }
    //   });

    //   console.log(this.sendTagInfo);
    //   this.user.name = this.name;
    //   this.tags = [];
    //   this.editTags.forEach((editTag, i) => {
    //     this.tags.push({ id: i, name: editTag.name });
    //   });
    //   this.user.bio = this.bio;
    //   this.closeModal();
    // },
    async editProfile() {
      this.sendTag_ids = [];
      this.error = '';
      this.editTags.forEach(async (tag) => {
        this.tagInfo = await Tag.searchTag(tag.name, 0);
        if (this.tagInfo.length === 1) {
          this.sendTag_ids.push(this.tagInfo[0].tag.id);
        } else {
          this.error = '#' + tag.name + 'は存在しないタグです。';
        }
      });
      if (this.error) return;
      console.log(this.sendTag_ids);
      try {
        await User.putUser(
          this.user.id,
          this.name,
          undefined,
          undefined,
          this.bio,
          this.image,
          undefined,
          undefined,
          this.sendTag_ids
        );
      } catch (error) {
        this.error = error;
      }
      if (this.error === '') {
        this.closeModal();
        this.user.name = this.name;
        this.tags = [];
        this.editTags.forEach((editTag, i) => {
          this.tags.push({ id: i, name: editTag.name });
        });
        this.user.bio = this.bio;
      }
    },
  },
};
</script>
<style></style>
