<template>
  <main>
    <the-header />
    <to-do-list></to-do-list>
  </main>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ToDoList from "./components/ToDoList.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheHeader,
    ToDoList,
  },

  computed: {
    ...mapGetters(["theme"]),
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
  max-width: 540px;
  min-width: 325px;
  margin: auto;
  padding-top: 100px;
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
