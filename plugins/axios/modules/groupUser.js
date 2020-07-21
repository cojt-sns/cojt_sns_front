/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  getGroupUser(id) {
    return axios.$get(`group_users/${id}`);
  },

  putGroupUser(id, name = null, image = null) {
    const form = new FormData();

    if (name) form.append('name', name);
    if (image) form.append('image', image);
    return axios.$put(`group_users/${id}`, form, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
};
