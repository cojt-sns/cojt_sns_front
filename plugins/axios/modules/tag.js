import { axios } from '../index.js';

export default {
  getTag(id) {
    return axios.$get(`tags/${id}`);
  },

  getTags(name, descendants) {
    return axios.$get(`tags`, { params: { name, descendants } });
  },

  postTag(name, parentId) {
    return axios.$post(`tags`, { name, parentId });
  },
};
