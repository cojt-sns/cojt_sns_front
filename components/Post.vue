<template>
  <article class="media">
    <figure class="media-left">
      <nuxt-link v-if="post.user.user_id" :to="`/users/${post.user.user_id}`">
        <figure class="image is-64x64">
          <img :src="serverUrl + post.user.image" @click="openModal()" />
        </figure>
      </nuxt-link>
      <figure v-else class="image is-64x64">
        <img :src="serverUrl + post.user.image" @click="openModal()" />
      </figure>
    </figure>
    <div class="media-content">
      <div class="content">
        <nuxt-link v-if="post.user.user_id" :to="`/users/${post.user.user_id}`">
          <strong>{{ post.user.name }}</strong>
        </nuxt-link>
        <strong v-else>{{ post.user.name }}</strong>
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
          <div class="level-item">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'comment']" />
            </span>
          </div>
          <div class="level-item">
            <div :class="{ 'is-active': dropDown }" class="dropdown">
              <div class="dropdown-trigger">
                <span
                  class="icon is-small"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="dropDown = !dropDown"
                >
                  <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
                </span>
              </div>
              <div
                v-if="post.user_id == $auth.user.user_id"
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
              <div v-else class="dropdown-menu" role="menu">
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
export default {
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
      serverUrl: process.env.SERVER_URL,
      content: this.post.content,
      dropDown: false,
      edit: false,
      row: this.adjustHeight(),
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
.media-left img {
  border-radius: 50%;
}
.post-content {
  white-space: pre-line;
}
textarea {
  overflow: hidden;
}
</style>
