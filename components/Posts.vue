<template>
  <div class="column is-fullheight">
    <nav class="level">
      <div class="level-left">
        <p class="level-item">
          <strong>
            #{{
              groups
                .find((group) => group.id == getGroupId())
                .tags.map((tag) => tag.fullname)
                .join('#')
            }}
          </strong>
        </p>
      </div>
      <div :class="{ 'is-active': dropDown }" class="dropdown is-right">
        <div class="dropdown-trigger">
          <div class="level-right">
            <span class="icon" @click="dropDown = !dropDown">
              <font-awesome-icon :icon="['fa', 'bars']" size="2x" />
            </span>
          </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              概要
            </a>
            <a class="dropdown-item">
              他の人を招待する
            </a>
            <a href="#" class="dropdown-item">
              Twitterで共有
            </a>
            <hr class="dropdown-divider" />
            <a href="#" class="dropdown-item has-text-danger">
              グループから退出する
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="posts">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @deletePost="deletePost"
      />
    </div>
    <div class="has-background-info footer">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input
            v-model="content"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </p>
        <div class="control">
          <button class="button" @click="send()">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from '~/components/Post';
import Post from '@/plugins/axios/modules/post';
import User from '@/plugins/axios/modules/user';
export default {
  components: {
    Post: PostComponent,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    groups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { content: '', dropDown: false };
  },
  mounted() {
    if (process.browser) {
      this.$cable.subscribe({
        channel: 'GroupChannel',
        id: this.getGroupId(),
      });
    }
  },
  beforeDestroy() {
    this.$cable.unsubscribe({
      channel: 'GroupChannel',
      id: this.getGroupId(),
    });
  },
  methods: {
    send() {
      Post.postGroupPost(this.getGroupId(), this.content).then((res) =>
        console.log(res)
      );
      this.content = '';
    },
    async arrangePost(src) {
      src.user = await User.getUser(src.user_id);
      src.user.image = process.env.SERVER_URL + src.user.image;
      return src;
    },
    deletePost(id) {
      Post.deletePost(id).then(
        (res) => (this.posts = this.posts.filter((post) => post.id !== res.id))
      );
    },
    getGroupId() {
      return Number(this.$route.params.id ?? 1);
    },
  },
  channels: {
    GroupChannel: {
      disconnected(data) {
        console.log('d!!');
      },
      connected(data) {
        console.log('connect!!');
      },
      async received(data) {
        console.log(data);
        if ('new' in data) this.posts.push(await this.arrangePost(data.new));
        if ('update' in data) {
          const i = this.posts.findIndex((p) => p.id === data.update.id);
          if (i === -1) return;
          this.posts.splice(i, 1, await this.arrangePost(data.update));
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  padding: 0;
  display: flex;
  flex-direction: column;
  .level {
    margin: 10px;
  }
  .posts {
    overflow-y: scroll;
    padding: 0;
    article {
      margin: 10px;
    }
  }
  .footer {
    padding: 5px;
    margin-top: auto;
  }
}
</style>
