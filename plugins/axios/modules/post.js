/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  searchPost(
    tag_id,
    content,
    from,
    since,
    until,
    since_timestamp,
    untile_timestamp,
    max
  ) {
    return axios.$get(`posts`, {
      params: {
        tag_id,
        content,
        from,
        since,
        until,
        since_timestamp,
        untile_timestamp,
        max,
      },
    });
  },

  getPublicGroupPost(
    group_id,
    content,
    from,
    since,
    until,
    since_timestamp,
    untile_timestamp,
    max
  ) {
    return axios.$get(`groups/${group_id}/public/posts`, {
      params: {
        content,
        from,
        since,
        until,
        since_timestamp,
        untile_timestamp,
        max,
      },
    });
  },

  getGroupPost(
    group_id,
    content,
    from,
    since,
    until,
    since_timestamp,
    untile_timestamp,
    max
  ) {
    return axios.$get(`groups/${group_id}/posts`, {
      params: {
        content,
        from,
        since,
        until,
        since_timestamp,
        untile_timestamp,
        max,
      },
    });
  },

  postGroupPost(group_id, content) {
    return axios.$post(`groups/${group_id}/posts`, { content });
  },

  getPost(id) {
    return axios.$get(`posts/${id}`);
  },

  putPost(id, content) {
    return axios.$put(`posts/${id}`, { content });
  },

  deletePost(id) {
    return axios.$delete(`posts/${id}`);
  },
};
