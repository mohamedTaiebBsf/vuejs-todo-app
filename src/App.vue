<template>
  <main>
    <the-header @addTask="addTask" />
    <to-do-list :tasks="tasks" @removeTask="removeTask"></to-do-list>
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
    };
  },
  methods: {
    addTask(task) {
      const newTask = {
        id: uuidv4(),
        title: task,
      };

      this.tasks.push(newTask);
    },

    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
};
</script>

<style>
@import "./assets/css/base.css";

#app {
  min-height: 100vh;
  color: var(--th-dark-light-text);
  background: url("./assets/img/bg-desktop-dark.jpg") no-repeat,
    var(--th-dark-bg);
}

main {
  max-width: 540px;
  min-width: 325px;
  margin: auto;
}
</style>
