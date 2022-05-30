<template>
  <ul :class="theme">
    <li
      v-for="filter in filters"
      :key="filter"
      :class="filter === activeFilter ? 'active' : ''"
      @click="$emit('setActiveFilter', filter)"
    >
      {{ filter }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    activeFilter: String,
    theme: String,
  },
  emits: ["setActiveFilter"],
  data() {
    return {
      filters: ["all", "active", "completed"],
    };
  },
};
</script>

<style scoped>
ul {
  display: flex;
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
</style>
