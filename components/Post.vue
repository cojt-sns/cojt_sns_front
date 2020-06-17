<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="post.user.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <nuxt-link :to="`users/${post.user.id}`">
          <strong>{{ post.user.name }}</strong>
          <small>@{{ post.user_id }}</small>
        </nuxt-link>
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
              >
              </textarea>
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
            <span class="icon is-small"
              ><font-awesome-icon :icon="['fas', 'reply']" />
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'retweet']"
            /></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"
              ><font-awesome-icon :icon="['fas', 'heart']"
            /></span>
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
              <div class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="editPost()">
                    投稿を更新する
                  </a>
                  <a
                    class="dropdown-item is-danger"
                    @click="$emit('deletePost', post.id)"
                  >
                    投稿を削除する
                  </a>
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
  },
  data() {
    return {
      content: this.post.content,
      dropDown: false,
      edit: false,
      row: this.adjustHeight(),
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
.post-content {
  white-space: pre-line;
}
textarea {
  overflow: hidden;
}
</style>
