/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  postUser(
    name,
    bio,
    email,
    image,
    password,
    oauth_token,
    oauth_token_secret,
    tags
  ) {
    const form = new FormData();
    form.append('name', name);
    form.append('bio', bio);
    form.append('email', email);
    if (image) form.append('image', image);
    form.append('password', password);
    form.append('oauth_token', oauth_token);
    form.append('oauth_token_secret', oauth_token_secret);
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
    name,
    bio,
    email,
    image,
    password,
    oauth_token,
    oauth_token_secret,
    tags
  ) {
    const form = new FormData();
    form.append('name', name);
    form.append('bio', bio);
    form.append('email', email);
    if (image) form.append('image', image);
    form.append('password', password);
    form.append('oauth_token', oauth_token);
    form.append('oauth_token_secret', oauth_token_secret);
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

  getUserTwitterProfile(id) {
    return axios.$get(`users/${id}/twitter_profile`);
  },
};
