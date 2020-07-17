<template>
  <div
    class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
  >
    <div
      class="header has-background-primary has-text-white has-text-centered title is-5"
    >
      Notification
    </div>
    <div class="cards">
      <div
        v-for="content in contents"
        :key="content.id"
        class="card notification"
      >
        <div class="card-content">
          <nav class="level">
            <div class="level-left">
              <figure v-if="content.image" class="image">
                <img :src="serverUrl + content.image" />
              </figure>
              <div v-else class="level-item title is-5 has-text-black">
                <font-awesome-icon :icon="['fas', 'users']" size="lg" />
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button
                  class="delete"
                  aria-label="close"
                  @click="CloseCard(content.id)"
                ></button>
              </div>
            </div>
          </nav>
          <div class="content">
            {{ content.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      serverUrl: process.env.SERVER_URL,
      contents: [],
      dropDown: false,
      WhichModal: 0,
    };
  },
  mounted() {
    if (process.browser) {
      this.$cable.subscribe({
        channel: 'NotificationChannel',
        token: this.$auth.getToken('local').replace('Bearer ', ''),
      });
    }
  },
  beforeDestroy() {
    this.$cable.unsubscribe({
      channel: 'NotificationChannel',
      token: this.$auth.getToken('local').replace('Bearer ', ''),
    });
  },
  methods: {
    CloseCard(id) {
      this.contents = this.contents.filter((content) => content.id !== id);
    },
  },
  channels: {
    NotificationChannel: {
      disconnected(data) {
        console.log('d!!');
      },
      connected(data) {
        console.log('connect!!');
      },
      received(data) {
        console.log(data);
        data.id =
          this.contents.length <= 0
            ? 1
            : this.contents[this.contents.length - 1].id + 1;
        this.contents.push(data);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  padding: 0;
  width: 300px !important;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #dbdbdb;

  .header {
    height: 3rem;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    padding-left: 1rem;
  }

  .cards {
    .card-content {
      margin: 1rem 0;
      padding: 0.5rem 1rem;
      padding-bottom: 1.3rem;
      background-color: #f5f5f5;

      .level-left img {
        width: 50px;
        border-radius: 50%;
      }
    }
  }

  .notification {
    width: 95%;
    margin: 5px auto;
    padding: 0;
  }
}
</style>
