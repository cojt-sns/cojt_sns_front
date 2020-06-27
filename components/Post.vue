<template>
  <article class="media">
    <GroupUserModal
      :groupuser="groupUser_"
      :group="group"
      :whichmodal="WhichModal"
      @close="closeModal(false)"
      @edit="closeModal(true)"
    />
    <GroupUserEditModal
      v-model="groupUser_"
      :group="group"
      :whichmodal="WhichModal"
      @close="openModal(false)"
    />
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="post.user.image" @click="openModal()" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <a @click="openModal()">
          <strong>{{ post.user.name }}</strong>
          <small>@{{ post.user.id }}</small>
        </a>
        <small>{{ new Date(post.created_at) }}</small>
        <br />
        <div v-if="!edit" class="post-content">{{ post.content }}</div>
        <div v-if="edit">
          <div class="field">
            <div class="control">
              <textarea
                ref="adjustTextarea"
                v-model="content"
                class="textarea"
                placeholder="Input Text"
                :rows="row"
                @keydown="adjustHeight"
              ></textarea>
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-success" @click="saveEdit()">
                Save
              </button>
            </div>
            <div class="control">
              <button class="button" @click="cancelEdit()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'reply']" />
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'retweet']" />
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'heart']" />
            </span>
          </a>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div :class="{ 'is-active': dropDown }" class="dropdown is-right">
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="dropDown = !dropDown"
                >
                  <span class="icon is-small">
                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                  </span>
                </button>
              </div>
              <div
                v-if="post.user_id == $auth.user.id"
                class="dropdown-menu"
                role="menu"
              >
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="editPost()"
                    >投稿を更新する</a
                  >
                  <a
                    class="dropdown-item has-text-danger"
                    @click="$emit('deletePost', post.id)"
                    >投稿を削除する</a
                  >
                </div>
              </div>
              <div
                v-if="post.user_id != $auth.user.id"
                class="dropdown-menu"
                role="menu"
              >
                <div class="dropdown-content">
                  <a class="dropdown-item">投稿を報告</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
import Post from '@/plugins/axios/modules/post';
import GroupUserModal from '~/components/GroupUserModal';
import GroupUserEditModal from '~/components/GroupUserEditModal';
export default {
  components: {
    GroupUserModal,
    GroupUserEditModal,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      content: this.post.content,
      dropDown: false,
      edit: false,
      row: this.adjustHeight(),
      WhichModal: 0,
      groupUser_: this.post.user,
    };
  },
  watch: {
    row() {
      this.adjustHeight();
    },
  },
  methods: {
    editPost() {
      this.edit = true;
      this.dropDown = false;
      this.content = this.post.content;
    },
    cancelEdit() {
      this.edit = false;
    },
    closeModal(isEdit) {
      // console.log(this.WhichModal);
      if (isEdit) this.WhichModal = 2;
      else this.WhichModal = 0;
      // console.log(this.WhichModal);
    },
    openModal() {
      this.WhichModal = 1;
    },
    saveEdit() {
      this.post.content = this.content;
      this.updatePost(this.post.id, this.content);
      this.edit = false;
    },
    async updatePost(id, content) {
      await Post.putPost(id, content);
    },
    adjustHeight() {
      const textarea = this.$refs?.adjustTextarea;
      if (textarea == null) return;

      const resetHeight = new Promise(function(resolve) {
        resolve((textarea.style.height = 'auto'));
      });
      resetHeight.then(function() {
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  white-space: pre-line;
}
textarea {
  overflow: hidden;
}
</style>
