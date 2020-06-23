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
      isPublic,
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
    const form = new FormData();
    if (twitter_traceability !== null)
      form.append('twitter_traceability', twitter_traceability);
    if (isPublic !== null) form.append('isPublic', isPublic);
    if (questions !== null)
      questions.forEach((v, i) => {
        form.append('questions[]', v); // arrayデータを分割して入れ直す
      });

    // form.append('questions', questions);
    if (introduction !== null) form.append('introduction', introduction);
    return axios.$put(`groups/${id}`, form, {
      headers: {
        'content-type': 'multipart/form-data',
      },
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
