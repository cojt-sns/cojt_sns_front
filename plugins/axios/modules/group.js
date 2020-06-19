/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  searchGroup(tag_ids, or) {
    return axios.$get(`groups`, { params: { tag_ids, or } });
  },

  postGroup(
    twitter_traceability = false,
    questions,
    introduction = false,
    tags
  ) {
    return axios.$post(`groups`, {
      twitter_traceability,
      questions,
      introduction,
      tags,
    });
  },

  getGroup(id) {
    return axios.$get(`groups/${id}`);
  },

  putGroup(
    id,
    twitter_traceability = false,
    questions,
    introduction = false,
    tags
  ) {
    return axios.$put(`groups/${id}`, {
      twitter_traceability,
      questions,
      introduction,
      tags,
    });
  },
  joinGroup(id, user_id) {
    return axios.$post(`groups/${id}/join`, {
      user_id,
    });
  },
  leaveGroup(id) {
    return axios.$post(`groups/${id}/leave`);
  },
};
