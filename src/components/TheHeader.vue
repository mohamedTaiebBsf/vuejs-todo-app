<template>
  <header>
    <h1>Todo</h1>
    <div @click="setTheme">
      <img v-if="theme === 'dark'" src="../assets/img/icon-sun.svg" alt="" />
      <img v-if="theme === 'light'" src="../assets/img/icon-moon.svg" alt="" />
    </div>
  </header>
  <form :class="theme" @submit.prevent="submit">
    <input type="text" placeholder="Add Task..." v-model.trim="inputValue" />
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      inputValue: "",
    };
  },

  computed: {
    ...mapGetters(["theme"]),
  },

  methods: {
    ...mapMutations(["setTheme"]),
    submit() {
      this.$store.commit("addTask", this.inputValue);
      this.inputValue = "";
    },
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

header > div {
  cursor: pointer;
}

form {
  margin-top: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

form::before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 20px;
  border: 1px solid var(--gray-soft);
}

form.dark input {
  color: var(--th-dark-light-text);
}

form.light input {
  color: var(--th-light-dark-text);
}

form input {
  width: 100%;
  padding: 20px;
  outline: none;
  border: none;
  background: transparent;
  caret-color: var(--bright-blue);
  font-family: inherit;
}

@media (max-width: 375px) {
  form {
    margin-top: 25px;
  }
}
</style>
