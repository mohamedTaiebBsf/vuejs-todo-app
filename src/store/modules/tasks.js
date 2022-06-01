import { v4 as uuidv4 } from "uuid";
import * as types from "../types";

const state = () => ({
  tasks: [],
});

const getters = {
  [types.TASKS](state) {
    return state.tasks;
  },

  [types.FILTERED_TASKS](state, getters, rootState) {
    switch (rootState.filters.activeFilter) {
      case "all":
        return state.tasks;
      case "active":
        return state.tasks.filter((task) => !task.completed);
      case "completed":
        return state.tasks.filter((task) => task.completed);
      default:
        return state.tasks;
    }
  },
};

const mutations = {
  [types.ADD_TASK](state, payload) {
    if (!payload) return;

    const newTask = {
      id: uuidv4(),
      title: payload,
      completed: false,
    };

    state.tasks.unshift(newTask);
  },

  [types.REMOVE_TASK](state, payload) {
    state.tasks = state.tasks.filter((task) => task.id !== payload);
  },

  [types.COMPLETE_TASK](state, payload) {
    state.tasks = state.tasks.map((task) => {
      return task.id === payload
        ? { ...task, completed: !task.completed }
        : task;
    });
  },

  [types.CLEAR_COMPLETED_TASKS](state) {
    state.tasks = state.tasks.filter((task) => !task.completed);
  },

  [types.DRAG_START_TASK](state, payload) {
    payload.event.dataTransfer.setData("fromId", payload.taskId);
    payload.event.dataTransfer.effectAllowed = "copy";
  },

  [types.DROP_TASK](state, payload) {
    const fromId = payload.event.dataTransfer.getData("fromId");

    if (fromId !== payload.taskId) {
      const fromIndex = state.tasks.findIndex((task) => task.id === fromId);
      const toIndex = state.tasks.findIndex(
        (task) => task.id === payload.taskId
      );

      [state.tasks[fromIndex], state.tasks[toIndex]] = [
        state.tasks[toIndex],
        state.tasks[fromIndex],
      ];
    }
  },
};

export default {
  state,
  getters,
  mutations,
};
