<template>
  <section :class="theme">
    <template v-if="tasks.length > 0">
      <ul v-if="filteredTasks.length > 0">
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          :class="task.completed ? 'complete' : ''"
        >
          <div @click="$emit('completeTask', task.id)"></div>
          {{ task.title }}
          <img
            src="../assets/img/icon-cross.svg"
            alt="delete"
            @click="$emit('removeTask', task.id)"
          />
        </li>
      </ul>
      <h5 v-else-if="filteredTasks.length === 0 && activeFilter !== 'all'">
        There is no {{ activeFilter }} tasks!
      </h5>
    </template>
    <h5 v-else>No task added yet!</h5>
    <div class="list-footer">
      <span>{{ activeTasks }}</span>
      <filters
        :activeFilter="activeFilter"
        :theme="theme"
        @setActiveFilter="$emit('setActiveFilter', $event)"
      />
      <button @click="$emit('clearCompleted')">clear completed</button>
    </div>
  </section>
</template>

<script>
import Filters from "./Filters.vue";

export default {
  components: {
    Filters,
  },
  props: {
    tasks: Array,
    activeFilter: String,
    theme: String,
  },
  emits: ["removeTask", "completeTask", "clearCompleted", "setActiveFilter"],
  computed: {
    activeTasks() {
      const activeTasksNum = this.tasks.filter(
        (task) => !task.completed
      ).length;

      return `${activeTasksNum} item${activeTasksNum > 1 ? "s" : ""} left`;
    },

    filteredTasks() {
      switch (this.activeFilter) {
        case "all":
          return this.tasks;
        case "active":
          return this.tasks.filter((task) => !task.completed);
        case "completed":
          return this.tasks.filter((task) => task.completed);
        default:
          return this.tasks;
      }
    },
  },
};
</script>

<style scoped>
section {
  border-radius: 5px;
  margin-top: 25px;
}

section ul li {
  padding: 20px;
  border-bottom: 1px solid var(--gray-soft);
  display: flex;
  align-items: center;
  cursor: pointer;
}

section ul li > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
  border: 1px solid var(--gray-soft);
}

section ul li.complete {
  text-decoration: line-through;
  color: var(--gray-soft);
}

section ul li.complete > div {
  background: url("../assets/img/icon-check.svg") no-repeat center,
    linear-gradient(to right, #57ddff, #c058f3);
  border: none;
}

section ul li > div:hover {
  border: 1px solid var(--bright-blue);
}

section ul li.complete > div:hover {
  border: none;
}

section ul li > img {
  margin-left: auto;
}

section h5 {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid var(--gray-soft);
}

section .list-footer {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--gray-soft);
  font-size: 16px;
}

section .list-footer button {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  transition: color 0.3s ease;
  text-transform: capitalize;
}

section.dark .list-footer button:hover {
  color: var(--th-dark-light-text);
}

section.light .list-footer button:hover {
  color: var(--th-light-dark-text);
}
</style>
