<template>
  <div class="column is-fullheight">
    <GroupEditModal
      v-model="group_"
      :whichmodal="WhichModal"
      :open="edit"
      @close="SwitchGroupEditModal"
    />
    <GroupExitModal
      :group="group_"
      :open="exit"
      @close="SwitchGroupExitModal"
    />
    <div class="header has-background-primary">
      <nav class="level">
        <div class="level-left">
          <div class="level-item title is-5 has-text-white">
            #{{ group_.fullname }}
          </div>
        </div>
        <div :class="{ 'is-active': dropDown }" class="dropdown is-right">
          <div class="dropdown-trigger">
            <div class="level-right">
              <span
                class="icon is-large has-text-white"
                @click="dropDown = !dropDown"
                @blur="dropDown = !dropDown"
              >
                <font-awesome-icon :icon="['fa', 'bars']" size="lg" />
              </span>
            </div>
          </div>
          <div id="dropdown-menu" class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item" @click="SwitchGroupEditModal"
                >編集</a
              >
              <a class="dropdown-item">他の人を招待する</a>
              <a href="#" class="dropdown-item">Twitterで共有</a>
              <hr class="dropdown-divider" />
              <a
                href="#"
                class="dropdown-item has-text-danger"
                @click="SwitchGroupExitModal"
                >グループから退出する</a
              >
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div ref="posts" class="posts">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :group="group_"
        @deletePost="deletePost"
      />
    </div>
    <div v-if="groupUser" class="media has-background-grey-lighter footer">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="serverUrl + groupUser.image" />
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea
              ref="adjustTextarea"
              v-model="content"
              class="textarea"
              placeholder="Input Text"
              :rows="row"
              @keydown="keyDowntextarea"
            ></textarea>
          </p>
        </div>
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <span class="icon">
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
    <div v-else class="has-background-grey-lighter footer join">
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-primary" @click="create()">
            グループに参加する
          </button>
        </div>
        <div class="control">
          <button class="button" @click="$router.go(-1)">戻る</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from '~/components/Post';
import GroupExitModal from '~/components/GroupExitModal';
import GroupEditModal from '~/components/GroupEditModal';
import Post from '@/plugins/axios/modules/post';
import GroupUser from '@/plugins/axios/modules/groupUser';
export default {
  components: {
    Post: PostComponent,
    GroupExitModal,
    GroupEditModal,
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
    groupUser: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      edit: false,
      serverUrl: process.env.SERVER_URL,
      content: '',
      dropDown: false,
      group_: this.groups.find(
        (group) => Number(group.id) === this.getGroupId()
      ),
      row: 1,
      exit: false,
    };
  },
  mounted() {
    if (process.browser) {
      this.scrollToEnd();
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
      this.row = 1;
      this.adjustHeight();
    },
    async arrangePost(src) {
      src.user = await GroupUser.getGroupUser(src.group_user_id);
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
    SwitchGroupEditModal() {
      this.edit = !this.edit;
    },
    SwitchGroupExitModal() {
      this.exit = !this.exit;
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
    scrollToEnd() {
      this.$nextTick(() => {
        const posts = this.$refs.posts;
        if (!posts) return;
        posts.scrollTop = posts.scrollHeight;
      });
    },
    keyDowntextarea(event) {
      this.adjustHeight();
      if (event.ctrlKey && event.keyCode === 13) {
        this.send();
      }
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
        const posts = this.$refs.posts;
        const isScrollEnd =
          posts.scrollHeight - (posts.clientHeight + posts.scrollTop) === 0;
        if ('new' in data) this.posts.push(await this.arrangePost(data.new));
        if ('update' in data) {
          const i = this.posts.findIndex((p) => p.id === data.update.id);
          if (i === -1) return;
          this.posts.splice(i, 1, await this.arrangePost(data.update));
        }
        if (isScrollEnd) this.scrollToEnd();
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
  .header .level {
    .level-left .level-item {
      margin-left: 10px;
    }
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
    textarea {
      overflow: hidden;
    }
    img {
      border-radius: 50%;
    }

    &.join {
      padding: 30px;
      background-color: rgba(#dbdbdb, 0.6) !important;
    }
  }
}
</style>
