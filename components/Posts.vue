<template>
  <div class="column is-fullheight">
    <GroupEditModal
      v-model="group_"
      :open="edit"
      @close="SwitchGroupEditModal"
    />
    <GroupExitModal
      :group="group_"
      :open="exit"
      @close="SwitchGroupExitModal"
    />
    <ParentSelectModal
      :group_id="group_.id"
      :open="parentSelect"
      @close="SwitchParentSelectModal"
    />
    <GroupJoinModal
      :open="join"
      :group="group_"
      @close="SwitchGroupJoinModal"
    />
    <GroupUserModal
      v-if="groupUser"
      :open="userModal"
      :group-user="groupUser"
      :group="group_"
      @close="SwitchGroupUserModal"
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
              <a
                v-if="groupUser"
                class="dropdown-item"
                @click="SwitchGroupUserModal"
                >{{ groupUser.name }}を編集</a
              >
              <a class="dropdown-item" @click="SwitchGroupEditModal"
                >グループを編集</a
              >
              <a class="dropdown-item" @click="SwitchParentSelectModal"
                >親グループを選択</a
              >
              <a class="dropdown-item">他の人を招待する</a>
              <a class="dropdown-item">Twitterで共有</a>
              <hr class="dropdown-divider" />
              <a
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
        :group-user="groupUser"
        @deletePost="deletePost"
      />
    </div>
    <CreatePost
      v-if="groupUser"
      :group-user="groupUser"
      class="has-background-grey-lighter"
    />
    <div v-else class="has-background-grey-lighter footer join">
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-primary" @click="SwitchGroupJoinModal()">
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
import ParentSelectModal from '~/components/ParentSelectModal';
import GroupJoinModal from '~/components/GroupJoinModal';
import GroupUserModal from '~/components/GroupUserModal';
import CreatePost from '~/components/CreatePost';
import Post from '@/plugins/axios/modules/post';
import GroupUser from '@/plugins/axios/modules/groupUser';
export default {
  components: {
    Post: PostComponent,
    GroupExitModal,
    GroupEditModal,
    ParentSelectModal,
    GroupJoinModal,
    GroupUserModal,
    CreatePost,
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
      dropDown: false,
      group_: this.groups.find(
        (group) => Number(group.id) === this.getGroupId()
      ),
      exit: false,
      parentSelect: false,
      join: false,
      userModal: false,
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
    SwitchParentSelectModal() {
      this.parentSelect = !this.parentSelect;
    },
    SwitchGroupJoinModal() {
      this.join = !this.join;
    },
    SwitchGroupUserModal() {
      this.userModal = !this.userModal;
    },
    scrollToEnd() {
      this.$nextTick(() => {
        const posts = this.$refs.posts;
        if (!posts) return;
        posts.scrollTop = posts.scrollHeight;
      });
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
        if ('new' in data) {
          if (data.new.thread_id) {
            const thread = this.posts.find((p) => p.id === data.new.thread_id);
            if (!thread) return;
            thread.thread.push(await this.arrangePost(data.new));
          } else {
            this.posts.push(await this.arrangePost(data.new));
          }
        }
        if ('update' in data) {
          if (data.update.thread_id) {
            const thread = this.posts.find(
              (p) => p.id === data.update.thread_id
            );
            if (!thread) return;
            const i = thread.thread.findIndex((p) => p.id === data.update.id);
            if (i === -1) return;
            thread.thread.splice(i, 1, await this.arrangePost(data.update));
          } else {
            const i = this.posts.findIndex((p) => p.id === data.update.id);
            if (i === -1) return;
            this.posts.splice(i, 1, await this.arrangePost(data.update));
          }
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
  .join {
    padding: 10px;
    margin-top: auto;
    padding: 30px;
    background-color: rgba(#dbdbdb, 0.6) !important;
  }
}
</style>
