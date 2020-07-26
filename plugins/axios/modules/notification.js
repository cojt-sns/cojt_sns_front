/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  getNotifications() {
    return axios.$get(`notifications`);
  },

  destroyNotification(id) {
    return axios.$delete(`notifications/${id}`);
  },
};
