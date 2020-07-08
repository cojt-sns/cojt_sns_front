<template>
  <div class="column is-fullheight">
    <!-- <GroupOverviewModal
      :group="group_"
      :whichmodal="WhichModal"
      @close="closeModal(false)"
      @edit="closeModal(true)"
    />
    <GroupEditModal
      v-model="group_"
      :whichmodal="WhichModal"
      @close="openModal(false)"
    /> -->
    <div class="header">
      <nav class="level">
        <div class="level-left">
          <div class="level-item title is-4 has-text-white">
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
              <a href="#" class="dropdown-item" @click="openModal()">概要</a>
              <a class="dropdown-item">他の人を招待する</a>
              <a href="#" class="dropdown-item">Twitterで共有</a>
              <hr class="dropdown-divider" />
              <a href="#" class="dropdown-item has-text-danger"
                >グループから退出する</a
              >
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="posts">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :group="group_"
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
// import GroupOverviewModal from '~/components/GroupOverviewModal';
// import GroupEditModal from '~/components/GroupEditModal';
import Post from '@/plugins/axios/modules/post';
import GroupUser from '@/plugins/axios/modules/groupUser';
export default {
  components: {
    Post: PostComponent,
    // GroupOverviewModal,
    // GroupEditModal,
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
    return {
      content: '',
      dropDown: false,
      WhichModal: 0,
      group_: this.groups.find(
        (group) => Number(group.id) === this.getGroupId()
      ),
    }; // WhichModal,0:閉じる,1:概要,2:編集
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
    closeModal(isEdit) {
      if (isEdit) this.WhichModal = 2;
      else this.WhichModal = 0;
    },
    openModal() {
      // console.log(this.WhichModal);
      this.WhichModal = 1;
      // console.log(this.WhichModal);
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
  .header .level {
    background-color: #fd5600;
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
  }
}
</style>
