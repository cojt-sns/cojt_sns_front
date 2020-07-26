<template>
  <div
    class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
  >
    <div class="header has-text-centered title is-5">
      Notification
    </div>
    <div class="cards">
      <div
        v-for="notification in notifications_"
        :key="notification.id"
        class="card notification"
      >
        <div class="card-content">
          <nav class="level">
            <div class="level-left">
              <figure v-if="notification.image" class="level-item image">
                <img :src="serverUrl + notification.image" />
              </figure>
              <div v-else class="level-item title is-5 has-text-black">
                <font-awesome-icon :icon="['fas', 'users']" size="lg" />
              </div>
              <p class="level-item">
                {{ $dayjs(notification.created_at).format('YYYY/MM/DD HH:mm') }}
              </p>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button
                  class="delete"
                  aria-label="close"
                  @click="CloseCard(notification.id)"
                ></button>
              </div>
            </div>
          </nav>
          <div class="content">
            <nuxt-link
              v-if="notification.url"
              :to="notification.url"
              :class="{ 'is-active': notification.url }"
            >
              {{ notification.content }}
            </nuxt-link>
            <span v-else>
              {{ notification.content }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/plugins/axios/modules/notification';
export default {
  components: {},
  props: {
    notifications: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      serverUrl: process.env.SERVER_URL,
      notifications_: this.notifications,
      dropDown: false,
      WhichModal: 0,
    };
  },
  mounted() {
    if (process.browser) {
      // this.GetNotification();
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
    async CloseCard(id) {
      try {
        const res = await Notification.destroyNotification(id);
        console.log(res);

        if (res.code === 200) {
          this.notifications_ = this.notifications_.filter(
            (notification) => notification.id !== id
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    async GetNotification() {
      const res = await Notification.getNotifications();
      this.notifications_ = res;
      console.log(this.notifications_);
    },
  },

  channels: {
    NotificationChannel: {
      disconnected(data) {
        console.log('d!!');
      },
      connected(data) {
        console.log('n connect!!');
      },
      received(data) {
        this.notifications.unshift(data);
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
    border-bottom: 1px solid #dbdbdb;
  }

  .cards {
    overflow-y: auto;
    .card {
      box-shadow: none;

      .card-content {
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        margin: 1rem 0;
        padding: 0.5rem 1rem;
        padding-bottom: 1.3rem;
        /* background-color: #f5f5f5; */

        .level-left img {
          width: 50px;
          border-radius: 50%;
        }

        .level-right {
          align-self: start;
        }
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
