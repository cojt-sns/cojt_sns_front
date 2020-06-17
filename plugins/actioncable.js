import Vue from 'vue';
import ActionCableVue from 'actioncable-vue';

if (process.client) {
  Vue.use(ActionCableVue, {
    debug: true,
    debugLevel: 'error',
    connectionUrl: process.env.ACTIONCABLE_URL + '/cable',
    connectImmediately: true,
  });
}
