import * as types from "../types";

const state = () => ({
  theme: "dark",
});

const getters = {
  [types.THEME](state) {
    return state.theme;
  },
};

const mutations = {
  [types.SET_THEME](state) {
    return state.theme === "dark"
      ? (state.theme = "light")
      : (state.theme = "dark");
  },
};

export default {
  state,
  getters,
  mutations,
};
