/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  getGroupUser(id) {
    return axios.$get(`group_users/${id}`);
  },

  getPublicGroupUser(id) {
    return axios.$get(`public/group_users/${id}`);
  },
};
