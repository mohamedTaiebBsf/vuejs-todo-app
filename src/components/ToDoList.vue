<template>
  <section :class="theme">
    <template v-if="tasks.length > 0">
      <ul v-if="filteredTasks.length > 0">
        <to-do-list-item
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          :theme="theme"
          @completeTask="$emit('completeTask', $event)"
          @removeTask="$emit('removeTask', $event)"
          @onDropHandler="dropHandler($event)"
        ></to-do-list-item>
      </ul>
      <h5 v-else-if="filteredTasks.length === 0 && activeFilter !== 'all'">
        There is no {{ activeFilter }} tasks!
      </h5>
    </template>
    <h5 v-else>No task added yet!</h5>
    <div class="list-footer">
      <span>{{ activeTasks }}</span>
      <div class="desktop">
        <filters
          :activeFilter="activeFilter"
          :theme="theme"
          @setActiveFilter="$emit('setActiveFilter', $event)"
        />
      </div>
      <button @click="$emit('clearCompleted')">clear completed</button>
    </div>
  </section>
  <div class="mobile-view" :class="theme">
    <filters
      :activeFilter="activeFilter"
      :theme="theme"
      @setActiveFilter="$emit('setActiveFilter', $event)"
    />
  </div>
</template>

<script>
import Filters from "./Filters.vue";
import ToDoListItem from "./ToDoListItem.vue";

export default {
  components: {
    Filters,
    ToDoListItem,
  },
  props: {
    tasks: Array,
    activeFilter: String,
    theme: String,
  },
  emits: ["removeTask", "completeTask", "clearCompleted", "setActiveFilter"],

  methods: {
    dropHandler(value) {
      const fromIndex = this.tasks.findIndex(
        (task) => task.id === value.fromId
      );
      const toIndex = this.tasks.findIndex((task) => task.id === value.taskId);

      [this.tasks[fromIndex], this.tasks[toIndex]] = [
        this.tasks[toIndex],
        this.tasks[fromIndex],
      ];
    },
  },
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
  overflow: hidden;
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

.mobile-view {
  display: none;
  padding: 20px;
  border-radius: 5px;
  margin-top: 18px;
}

@media (max-width: 500px) {
  .mobile-view {
    display: block;
  }

  .desktop {
    display: none;
  }
}

@media (max-width: 375px) {
  section {
    margin-top: 18px;
  }
}
</style>
