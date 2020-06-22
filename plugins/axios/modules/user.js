/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  postUser(
    name,
    email,
    password,
    bio = null,
    image = null,
    oauth_token = null,
    oauth_token_secret = null,
    tags = null
  ) {
    const form = new FormData();

    form.append('name', name);
    if (bio) form.append('bio', bio);
    form.append('email', email);
    if (image) form.append('image', image);
    form.append('password', password);
    if (oauth_token) form.append('oauth_token', oauth_token);
    if (oauth_token_secret)
      form.append('oauth_token_secret', oauth_token_secret);
    if (tags)
      tags.forEach((v, i) => {
        form.append('tags[]', v);
      });

    return axios.$post(`users`, form, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },

  getUser(id) {
    return axios.$get(`users/${id}`);
  },

  putUser(
    id,
    name = null,
    email = null,
    password = null,
    bio = null,
    image = null,
    oauth_token = null,
    oauth_token_secret = null,
    tags = null
  ) {
    const form = new FormData();
    if (name) form.append('name', name);
    if (bio) form.append('bio', bio);
    if (email) form.append('email', email);
    if (image) form.append('image', image);
    if (password) form.append('password', password);
    if (oauth_token) form.append('oauth_token', oauth_token);
    if (oauth_token_secret)
      form.append('oauth_token_secret', oauth_token_secret);
    if (tags)
      tags.forEach((v, i) => {
        form.append('tags[]', v);
      });

    return axios.$put(`users/${id}`, form, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },

  deleteUser(id) {
    return axios.$delete(`users/${id}`);
  },

  getUserTag(id) {
    return axios.$get(`users/${id}/tags`);
  },

  getUserGroup(id) {
    return axios.$get(`users/${id}/groups`);
  },

  getUserTwitterProfile(id) {
    return axios.$get(`users/${id}/twitter_profile`);
  },
};
