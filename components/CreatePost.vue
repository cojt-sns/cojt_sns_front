<template>
  <div class="media">
    <input ref="image" class="file-input" type="file" @change="selectImage" />

    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-rounded" :src="serverUrl + groupUser.image" />
      </p>
    </figure>
    <div class="media-content">
      <figure v-if="image" class="image post-image">
        <img :src="image" />
        <a class="delete is-medium" @click="deleteImage" />
      </figure>
      <div class="field">
        <p class="control">
          <textarea
            ref="adjustTextarea"
            v-model="content"
            class="textarea"
            :placeholder="'#' + group.name + 'で投稿'"
            :rows="row"
            @keydown="keyDowntextarea"
          ></textarea>
        </p>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <span class="icon" @click="$refs.image.click()">
              <font-awesome-icon :icon="['fa', 'image']" size="lg" />
            </span>
          </div>
          <div class="level-item">
            <span class="icon">
              <font-awesome-icon :icon="['fa', 'grin']" size="lg" />
            </span>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary" @click="send()">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/plugins/axios/modules/post';
export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
    groupUser: {
      type: Object,
      required: true,
    },
    thread: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      serverUrl: process.env.SERVER_URL,
      content: '',
      row: 1,
      image: null,
      file: null,
    };
  },
  methods: {
    async send() {
      await Post.postGroupPost(
        this.groupUser.group_id,
        this.content,
        this.file,
        this.thread?.id
      );
      this.content = '';
      this.adjustHeight();
      this.row = 1;
      this.file = null;
      this.image = null;
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
    keyDowntextarea(event) {
      this.adjustHeight();
      if (event.ctrlKey && event.keyCode === 13) {
        this.send();
      }
    },
    selectImage(e) {
      if (!e.target.files || e.target.files.length === 0) return;
      this.file = e.target.files[0];
      this.image = window.URL.createObjectURL(this.file);
    },
    deleteImage() {
      this.file = null;
      this.image = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.media {
  .file-input {
    display: none;
  }

  padding: 10px;
  margin-top: auto;
  textarea {
    overflow: hidden;
  }

  .post-image {
    margin: 10px;
    position: relative;
    width: fit-content;

    .delete {
      position: absolute;
      top: 0px;
      right: 0px;
    }
    img {
      max-height: 40vh;
      width: auto;
      border-radius: 10px;
    }
  }
  .icon {
    transition: all 0.3s;
    &:hover {
      color: hsl(0, 0%, 48%);
    }
  }
}
</style>
