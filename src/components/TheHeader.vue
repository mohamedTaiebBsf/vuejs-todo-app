<template>
  <header>
    <h1>Todo</h1>
    <theme-switcher></theme-switcher>
  </header>
  <task-form></task-form>
</template>

<script>
import TaskForm from "./Form.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

export default {
  components: {
    TaskForm,
    ThemeSwitcher,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 15px;
  color: var(--th-dark-light-text);
}
</style>
