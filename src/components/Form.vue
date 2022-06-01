<template>
  <form :class="theme" @submit.prevent="submit">
    <input type="text" placeholder="Add Task..." v-model.trim="inputValue" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../store/types";

export default {
  data() {
    return {
      inputValue: "",
    };
  },

  computed: {
    ...mapGetters({ theme: types.THEME }),
  },
  methods: {
    submit() {
      this.$store.commit(types.ADD_TASK, this.inputValue);
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
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
