<template>
  <main>
    <the-header />
    <to-do-list></to-do-list>
  </main>
  <p>Drag & Drop to reorder list</p>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ToDoList from "./components/ToDoList.vue";
import { mapGetters } from "vuex";
import * as types from "./store/types";

export default {
  components: {
    TheHeader,
    ToDoList,
  },

  computed: {
    ...mapGetters({
      theme: types.THEME,
    }),
  },

  methods: {
    addClassToApp(theme) {
      if (theme === "dark") {
        this.$el.parentNode.classList.add("dark");
        this.$el.parentNode.classList.remove("light");
      } else {
        this.$el.parentNode.classList.add("light");
        this.$el.parentNode.classList.remove("dark");
      }
    },
  },

  watch: {
    theme(newTheme, oldTheme) {
      this.addClassToApp(newTheme);
    },
  },
  mounted() {
    this.addClassToApp(this.theme);
  },
};
</script>

<style>
@import "./assets/css/base.css";

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app.dark {
  color: var(--th-dark-light-text);
  background: url("./assets/img/bg-desktop-dark.jpg") no-repeat,
    var(--th-dark-bg);
}

#app.light {
  color: var(--th-light-dark-text);
  background: url("./assets/img/bg-desktop-light.jpg") no-repeat,
    var(--th-light-bg);
}

main {
  width: 100%;
  max-width: 540px;
  min-width: 325px;
  margin: 0 auto;
  padding-top: 100px;
}

#app p {
  text-align: center;
  margin-top: auto;
  margin-bottom: 50px;
}

@media (max-width: 580px) {
  #app {
    padding: 0 25px;
  }
}

@media (max-width: 375px) {
  #app.dark {
    background: url("./assets/img/bg-mobile-dark.jpg") no-repeat,
      var(--th-dark-bg);
  }

  #app.light {
    background: url("./assets/img/bg-mobile-light.jpg") no-repeat,
      var(--th-light-bg);
  }

  main {
    padding-top: 40px;
  }
}
</style>
