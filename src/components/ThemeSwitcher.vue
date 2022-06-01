<template>
  <div @click="setTheme">
    <img v-if="theme === 'dark'" src="../assets/img/icon-sun.svg" alt="" />
    <img v-if="theme === 'light'" src="../assets/img/icon-moon.svg" alt="" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as types from "../store/types";

export default {
  computed: {
    ...mapGetters({ theme: types.THEME }),
  },

  methods: {
    ...mapMutations({
      setTheme: types.SET_THEME,
    }),
  },
};
</script>

<style scoped>
div {
  cursor: pointer;
}
</style>
