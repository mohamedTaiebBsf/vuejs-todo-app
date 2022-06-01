<template>
  <ul :class="theme">
    <li
      v-for="filter in filters"
      :key="filter"
      :class="filter === activeFilter ? 'active' : ''"
      @click="setActiveFilter(filter)"
    >
      {{ filter }}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as types from "../store/types";

export default {
  data() {
    return {
      filters: ["all", "active", "completed"],
    };
  },
  computed: {
    ...mapGetters({
      activeFilter: types.ACTIVE_FILTER,
      theme: types.THEME,
    }),
  },
  methods: {
    ...mapMutations({
      setActiveFilter: types.SET_ACTIVE_FILTER,
    }),
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: var(--gray-soft);
}

ul li {
  margin-right: 10px;
  text-transform: capitalize;
  cursor: pointer;
  transition: color 0.3s ease;
}

ul li.active {
  color: var(--bright-blue);
}

ul li:last-child {
  margin-right: 0;
}

ul.dark li:hover {
  color: var(--th-dark-light-text);
}

ul.light li:hover {
  color: var(--th-light-dark-text);
}

@media (max-width: 500px) {
  ul li {
    margin-right: 25px;
  }
}
</style>
