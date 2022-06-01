import * as types from "../types";

const state = () => ({
  activeFilter: "all",
});

const getters = {
  [types.ACTIVE_FILTER](state) {
    return state.activeFilter;
  },
};

const mutations = {
  [types.SET_ACTIVE_FILTER](state, payload) {
    state.activeFilter = payload;
  },
};

export default {
  state,
  getters,
  mutations,
};
