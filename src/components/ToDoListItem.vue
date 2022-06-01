<template>
  <li
    :class="[theme, { complete: task.completed, draggable: isDragEnter }]"
    draggable="true"
    @dragstart="onDragStart({ event: $event, taskId: task.id })"
    @dragenter="isDragEnter = true"
    @dragover.prevent
    @dragleave.prevent="isDragEnter = false"
    @drop="dropHandler($event, task.id)"
  >
    <div @click="completeTask(task.id)"></div>
    {{ task.title }}
    <img
      src="../assets/img/icon-cross.svg"
      alt="delete"
      @click="removeTask(task.id)"
    />
  </li>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as types from "../store/types";

export default {
  props: {
    task: Object,
  },

  data() {
    return {
      isDragEnter: false,
    };
  },

  computed: {
    ...mapGetters({
      theme: types.THEME,
    }),
  },

  methods: {
    ...mapMutations({
      removeTask: types.REMOVE_TASK,
      completeTask: types.COMPLETE_TASK,
      onDragStart: types.DRAG_START_TASK,
    }),
    dropHandler(event, taskId) {
      this.$store.commit(types.DROP_TASK, { event, taskId });
      this.isDragEnter = false;
    },
  },
};
</script>

<style scoped>
li {
  padding: 20px;
  border-bottom: 1px solid var(--gray-soft);
  display: flex;
  align-items: center;
  cursor: pointer;
}

li > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
  border: 1px solid var(--gray-soft);
}

li.complete {
  text-decoration: line-through;
  color: var(--gray-soft);
}

li.complete > div {
  background: url("../assets/img/icon-check.svg") no-repeat center,
    linear-gradient(to right, #57ddff, #c058f3);
  border: none;
}

li > div:hover {
  border: 1px solid var(--bright-blue);
}

li.complete > div:hover {
  border: none;
}

li > img {
  margin-left: auto;
}

li.dark.draggable {
  background: #2b2f52;
  color: rgba(228, 229, 241, 0.5);
}

li.light.draggable {
  background: #d9d8cf;
  color: rgba(72, 75, 106, 0.5);
}
</style>
