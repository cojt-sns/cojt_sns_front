/* eslint-disable camelcase */
import { axios } from '../index.js';

export default {
  searchGroup(name = null, or = null, descendants = null) {
    const params = {};
    if (name) params.name = name;
    if (descendants) params.descendants = descendants;
    if (or) params.or = or;
    return axios.$get(`groups`, { params });
  },

  postGroup(name, parent_id = null) {
    return axios.$post(`groups`, { name, parent_id });
  },

  getGroup(id) {
    return axios.$get(`groups/${id}`);
  },

  putGroup(id, name = null, parent_id) {
    const body = { parent_id };
    if (name != null) body.name = name;
    return axios.$put(`groups/${id}`, body);
  },
  joinGroup(id, name, image = null) {
    const form = new FormData();

    form.append('name', name);
    if (image) form.append('image', image);
    return axios.$post(`groups/${id}/join`, form, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },

  leaveGroup(id) {
    return axios.$post(`groups/${id}/leave`);
  },

  getGroupMember(id) {
    return axios.$get(`groups/${id}/group_users`);
  },

  getGroupLoginMember(id) {
    return axios.$get(`groups/${id}/group_user`);
  },
};
