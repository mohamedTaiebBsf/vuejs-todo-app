<template>
  <main>
    <the-header :theme="theme" @setTheme="setTheme" @addTask="addTask" />
    <to-do-list
      :tasks="tasks"
      :activeFilter="activeFilter"
      :theme="theme"
      @removeTask="removeTask"
      @completeTask="completeTask"
      @clearCompleted="clearCompleted"
      @setActiveFilter="setActiveFilter"
    ></to-do-list>
  </main>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ToDoList from "./components/ToDoList.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    TheHeader,
    ToDoList,
  },
  data() {
    return {
      tasks: [],
      activeFilter: "all",
      theme: "dark",
    };
  },
  methods: {
    addTask(task) {
      if (!task) return;

      const newTask = {
        id: uuidv4(),
        title: task,
        completed: false,
      };

      this.tasks.push(newTask);
    },

    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },

    completeTask(taskId) {
      this.tasks = this.tasks.map((task) => {
        return task.id === taskId
          ? { ...task, completed: !task.completed }
          : task;
      });
    },

    clearCompleted() {
      this.tasks = this.tasks.filter((task) => !task.completed);
    },

    setActiveFilter(filter) {
      this.activeFilter = filter;
    },

    setTheme() {
      return this.theme === "dark"
        ? (this.theme = "light")
        : (this.theme = "dark");
    },

    addClassToApp(theme) {
      if (theme === "dark") {
        this.$el.parentNode.classList.add("dark");
        this.$el.parentNode.classList.remove("light");
      } else {
        this.$el.parentNode.classList.add("light");
        this.$el.parentNode.classList.remove("dark");
      }
    },
  },

  watch: {
    theme(newTheme, oldTheme) {
      this.addClassToApp(newTheme);
    },
  },
  mounted() {
    this.addClassToApp(this.theme);
  },
};
</script>

<style>
@import "./assets/css/base.css";

#app {
  min-height: 100vh;
}

#app.dark {
  color: var(--th-dark-light-text);
  background: url("./assets/img/bg-desktop-dark.jpg") no-repeat,
    var(--th-dark-bg);
}

#app.light {
  color: var(--th-light-dark-text);
  background: url("./assets/img/bg-desktop-light.jpg") no-repeat,
    var(--th-light-bg);
}

main {
  max-width: 540px;
  min-width: 325px;
  margin: auto;
  padding-top: 78px;
}
</style>
