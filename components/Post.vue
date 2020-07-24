<template>
  <article class="media">
    <figure class="media-left">
      <nuxt-link v-if="post.user.user_id" :to="`/users/${post.user.user_id}`">
        <figure class="image is-64x64 post-icon">
          <img :src="serverUrl + post.user.image" @click="openModal()" />
        </figure>
      </nuxt-link>
      <figure v-else class="image is-64x64 post-icon">
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
        <div v-if="post.image" class="image post-image">
          <img :src="serverUrl + post.image" />
        </div>
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
                @keydown="adjustHeight($refs.adjustTextarea)"
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
          <div
            v-if="post.thread"
            class="level-item re"
            @click="thread = !thread"
          >
            <a v-if="post.thread.length > 0">
              {{ post.thread.length }}件の返信
            </a>
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'comment']" />
            </span>
          </div>
          <div v-if="post.user.id && groupUser" class="level-item">
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
                v-if="post.user.id === groupUser.id"
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
                v-else-if="groupUser.admin && post.user.id"
                class="dropdown-menu"
                role="menu"
              >
                <div class="dropdown-content">
                  <a
                    v-if="!post.user.admin"
                    class="dropdown-item"
                    @click="authorization"
                    >{{ post.user.name }}に管理者権限を与える</a
                  >
                  <a v-else class="dropdown-item" @click="unauthorization"
                    >{{ post.user.name }}から管理者権限を削除する</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <transition
        name="thread"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-if="thread" class="thread">
          <Post
            v-for="child in post.thread"
            :key="child.id"
            :post="child"
            :group="group"
            :group-user="groupUser"
            @deletePost="(id) => $emit('deletePost', id)"
          />
          <CreatePost :group-user="groupUser" :thread="post" />
        </div>
      </transition>
    </div>
  </article>
</template>

<script>
import CreatePost from '~/components/CreatePost';
import PostComponent from '~/components/Post';
import Post from '@/plugins/axios/modules/post';
import GroupUser from '@/plugins/axios/modules/groupUser';
export default {
  name: 'Post',
  components: {
    Post: PostComponent,
    CreatePost,
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
    groupUser: {
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
      row: this.adjustHeight(this.$refs?.adjustTextarea),
      groupUser_: this.post.user,
      thread: false,
      threadRow: this.adjustHeight(this.$refs?.adjustTextarea),
      image: null,
      file: null,
    };
  },
  watch: {
    row() {
      this.adjustHeight(this.$refs?.adjustTextarea);
    },
  },
  methods: {
    async send() {
      await Post.postGroupPost(this.getGroupId(), this.content, this.file);
      this.content = '';
      this.threadRow = 1;
      this.adjustHeight();
      this.file = null;
      this.image = null;
    },
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
    adjustHeight(textarea) {
      if (textarea == null) return;

      const resetHeight = new Promise(function(resolve) {
        resolve((textarea.style.height = 'auto'));
      });
      resetHeight.then(function() {
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    },
    keyDowntextarea(event) {
      this.adjustHeight(this.$refs?.threadTextArea);
      if (event.ctrlKey && event.keyCode === 13) {
        this.send();
      }
    },
    beforeEnter(el) {
      el.style.height = '0';
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave(el) {
      el.style.height = '0';
    },
    async authorization() {
      try {
        await GroupUser.authorization(this.post.user.id);
        location.href = `/groups/${this.group.id}`;
      } catch (error) {
        console.log(error);
      }
    },
    async unauthorization() {
      try {
        await GroupUser.unauthorization(this.post.user.id);
        location.href = `/groups/${this.group.id}`;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.media-left img {
  border-radius: 50%;
}
.post-icon img {
  transition: all 0.3s;
  &:hover {
    opacity: 0.7;
  }
}
.post-content {
  white-space: pre-line;
}
.post-image {
  text-align: start;
  margin: 10px;
  img {
    background-color: #d8d8d8;
    max-height: 50vh;
    width: auto;
    border-radius: 10px;
  }
}
textarea {
  overflow: hidden;
}
.re {
  a {
    margin-right: 0.5rem;
  }
}

.level {
  transition: margin-bottom 0.3s;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.thread {
  overflow: hidden;
}

.thread-enter-active,
.thread-leave-active {
  transition: height 0.5s;
}

.thread-enter,
.thread-leave-to {
  height: -10px;
}
.icon {
  transition: all 0.2s;
  &:hover {
    color: #b5b5b5;
  }
}
</style>
