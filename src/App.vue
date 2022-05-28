<template>
  <main>
    <the-header />
    <to-do-list :tasks="tasks"></to-do-list>
  </main>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ToDoList from "./components/ToDoList.vue";

export default {
  data() {
    return {
      tasks: [
        // { id: 1, title: "Vue.js" },
        // { id: 2, title: "React.js" },
        // { id: 3, title: "Angular.js" },
      ],
    };
  },
  components: {
    TheHeader,
    ToDoList,
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
