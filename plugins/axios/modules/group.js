/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  searchGroup(tag_ids = null, or = null) {
    const params = {};
    if (tag_ids) params.tag_ids = tag_ids;
    if (or) params.or = or;
    return axios.$get(`groups`, { params });
  },

  postGroup(
    isPublic = true,
    twitter_traceability = false,
    questions,
    introduction = false,
    tags
  ) {
    return axios.$post(`groups`, {
      public: isPublic,
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
    twitter_traceability = null,
    isPublic = null,
    questions = null,
    introduction = null
  ) {
    return axios.$put(`groups/${id}`, {
      twitter_traceability,
      questions,
      introduction,
      public: isPublic,
    });
  },
  joinGroup(id, user_id, answer, bio = null) {
    const answerStr = answer.join('$');
    return axios.$post(`groups/${id}/join`, {
      user_id,
      answerStr,
      bio,
    });
  },
  leaveGroup(id) {
    return axios.$post(`groups/${id}/leave`);
  },
};
