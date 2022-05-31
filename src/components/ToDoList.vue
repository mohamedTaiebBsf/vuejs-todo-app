<template>
  <section :class="theme">
    <transition name="fade" mode="out-in">
      <template v-if="tasks.length > 0">
        <transition-group
          tag="ul"
          name="task-slide"
          v-if="filteredTasks.length > 0"
        >
          <to-do-list-item
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
          ></to-do-list-item>
        </transition-group>
        <h5 v-else-if="filteredTasks.length === 0 && activeFilter !== 'all'">
          There is no {{ activeFilter }} tasks!
        </h5>
      </template>
      <h5 v-else>No task added yet!</h5>
    </transition>
    <div class="list-footer">
      <span>{{ activeTasks }}</span>
      <div class="desktop">
        <filters />
      </div>
      <button @click="clearCompleted">clear completed</button>
    </div>
  </section>
  <div class="mobile-view" :class="theme">
    <filters />
  </div>
</template>

<script>
import Filters from "./Filters.vue";
import ToDoListItem from "./ToDoListItem.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Filters,
    ToDoListItem,
  },

  computed: {
    ...mapGetters(["tasks", "activeFilter", "theme", "filteredTasks"]),
    activeTasks() {
      const activeTasksNum = this.tasks.filter(
        (task) => !task.completed
      ).length;

      return `${activeTasksNum} item${activeTasksNum > 1 ? "s" : ""} left`;
    },
  },

  methods: {
    ...mapMutations(["clearCompleted", "setActiveFilter"]),
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

section ul {
  max-height: 300px;
  overflow-y: auto;
}

section ul .fade-enter-active,
section ul .fade-leave-from {
  overflow-y: hidden;
}

section ul::-webkit-scrollbar {
  width: 5px;
}

section ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #808080;
  border-radius: 5px;
}

section ul::-webkit-scrollbar-thumb {
  background: #6a6ac6;
  border-radius: 10px;
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

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active {
  transition: all 1s ease-out;
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-leave-active {
  transition: all 1s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-slide-enter-active {
  animation: slide-in 0.3s ease-out;
}

.task-slide-leave-active {
  animation: slide-out 0.3s ease-out;
  position: absolute;
}

.task-slide-move {
  transition: all 0.3s;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateY(0px);
  }

  to {
    opacity: 0;
    transform: translateY(-20px);
  }
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
