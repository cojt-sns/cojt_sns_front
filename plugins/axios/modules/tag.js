import { axios } from '../index.js';

export default {
  getTag(id) {
    return axios.$get(`tags/${id}`);
  },

  searchTag(name, descendants) {
    return axios.$get(`tags`, { params: { name, descendants } });
  },

  postTag(name, parent_id) {
    return axios.$post(`tags`, { name, parent_id });
  },
};
