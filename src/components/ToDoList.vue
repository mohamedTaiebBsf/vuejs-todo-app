<template>
  <section class="dark">
    <ul v-if="tasks.length > 0">
      <li
        v-for="task in tasks"
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
    <h5 v-else>No task added yet!</h5>
    <div class="list-footer">
      <span>5 items left</span>
      <button>clear completed</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tasks: Array,
  },
  emits: ["removeTask", "completeTask"],
};
</script>

<style scoped>
section {
  border-radius: 5px;
  margin-top: 25px;
}

section:hover {
  cursor: pointer;
}

section ul {
  list-style: none;
}

section ul li {
  padding: 20px;
  border-bottom: 1px solid var(--gray-soft);
  display: flex;
  align-items: center;
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
  cursor: auto;
}

section .list-footer {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--gray-soft);
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
