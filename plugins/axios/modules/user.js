/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  postUser(
    name,
    email,
    image,
    password,
    oauth_token,
    oauth_token_secret,
    tags
  ) {
    return axios.$post(`users`, {
      name,
      email,
      image,
      password,
      oauth_token,
      oauth_token_secret,
      tags,
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
    return axios.$put(`users/${id}`, {
      name,
      bio,
      email,
      image,
      password,
      oauth_token,
      oauth_token_secret,
      tags,
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
