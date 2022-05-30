<template>
  <li
    :class="[theme, { complete: task.completed, draggable: isDragEnter }]"
    draggable="true"
    @dragstart="onDragStart($event, task.id)"
    @dragenter="isDragEnter = true"
    @dragover.prevent
    @dragleave.prevent="isDragEnter = false"
    @drop="onDrop($event, task.id)"
  >
    <div @click="$emit('completeTask', task.id)"></div>
    {{ task.title }}
    <img
      src="../assets/img/icon-cross.svg"
      alt="delete"
      @click="$emit('removeTask', task.id)"
    />
  </li>
</template>

<script>
export default {
  props: {
    task: Object,
    theme: String,
  },
  emits: ["removeTask", "completeTask", "onDropHandler"],
  data() {
    return {
      isDragEnter: false,
    };
  },
  methods: {
    onDragStart(event, taskId) {
      event.dataTransfer.setData("fromId", taskId);
      event.dataTransfer.effectAllowed = "copy";
    },

    onDrop(event, taskId) {
      const fromId = event.dataTransfer.getData("fromId");

      if (fromId !== taskId) {
        this.$emit("onDropHandler", { fromId, taskId });
      }
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
