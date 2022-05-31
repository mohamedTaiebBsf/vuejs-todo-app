import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

const store = createStore({
  state() {
    return {
      tasks: [],
      activeFilter: "all",
      theme: "dark",
    };
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },

    activeFilter(state) {
      return state.activeFilter;
    },

    theme(state) {
      return state.theme;
    },

    filteredTasks(state) {
      switch (state.activeFilter) {
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
  },
  mutations: {
    addTask(state, payload) {
      if (!payload) return;

      const newTask = {
        id: uuidv4(),
        title: payload,
        completed: false,
      };

      state.tasks.unshift(newTask);
    },

    removeTask(state, payload) {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },

    completeTask(state, payload) {
      state.tasks = state.tasks.map((task) => {
        return task.id === payload
          ? { ...task, completed: !task.completed }
          : task;
      });
    },

    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },

    setActiveFilter(state, payload) {
      state.activeFilter = payload;
    },

    setTheme(state) {
      return state.theme === "dark"
        ? (state.theme = "light")
        : (state.theme = "dark");
    },

    onDragStart(state, payload) {
      payload.event.dataTransfer.setData("fromId", payload.taskId);
      payload.event.dataTransfer.effectAllowed = "copy";
    },

    onDrop(state, payload) {
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
  },
});

export default store;
