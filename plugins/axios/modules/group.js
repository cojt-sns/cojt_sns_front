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
    visible_profile = false,
    questions,
    introduction = false,
    tags
  ) {
    return axios.$post(`groups`, {
      public: isPublic,
      visible_profile,
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
    visible_profile = null,
    isPublic = null,
    questions = null,
    introduction = null
  ) {
    return axios.$put(`groups/${id}`, {
      visible_profile,
      questions,
      introduction,
      public: isPublic,
    });
  },
  joinGroup(id, user_id, name, answers, bio = null) {
    return axios.$post(`groups/${id}/join`, {
      name,
      user_id,
      answers,
      bio,
    });
  },
  leaveGroup(id) {
    return axios.$post(`groups/${id}/leave`);
  },
  getGroupMember(id) {
    return axios.$get(`groups/${id}/group_users`);
  },
  getPublicGroupMember(id) {
    return axios.$get(`public/groups/${id}/group_users`);
  },
  getGroupUser(id) {
    return axios.$get(`group_users/${id}`);
  },
  getPublicGroupUser(id) {
    return axios.$get(`public/group_users/${id}`);
  },
  putGroupUser(id, name, answers, introduction, image) {
    return axios.$put(`group_users/${id}`, {
      name,
      answers,
      introduction,
      image,
    });
  },
};
