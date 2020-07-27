export const state = () => ({
  lastAccessGroupId: 0,
});

export const mutations = {
  changeLastAccessGroupId(state, lastAccessGroupId) {
    state.lastAccessGroupId = lastAccessGroupId;
  },
};
