<template>
  <div
    class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile has-background-black"
  >
    Notification
    <div
      v-for="content in contents"
      :key="content.id"
      class="card notification"
    >
      <header class="card-header">
        <p class="card-header-title">
          {{ content.title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          {{ content.description }}
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
  methods: {},
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
            : this.contents[this.contents.length - 1] + 1;
        this.contents.push(data);
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

  .notification {
    width: 95%;
    margin: 5px auto;
    padding: 0;
  }
}
</style>
