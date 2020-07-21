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

  postGroupPost(group_id, content = null, image = null, thread_id = null) {
    const form = new FormData();

    if (content) form.append('content', content);
    if (image) form.append('image', image);
    if (thread_id) form.append('thread_id', thread_id);
    return axios.$post(`groups/${group_id}/posts`, form, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
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
