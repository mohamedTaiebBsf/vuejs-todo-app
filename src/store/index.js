import { createStore } from "vuex";
import modules from "./modules";
import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
  key: "todo-state",
  paths: ["tasks", "theme"],
});

const store = createStore({
  modules: {
    ...modules,
  },
  plugins: [dataState],
});

export default store;
