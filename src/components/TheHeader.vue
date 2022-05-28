<template>
  <header>
    <h1>Todo</h1>
    <div><img src="../assets/img/icon-sun.svg" alt="" /></div>
  </header>
  <form class="dark">
    <input type="text" placeholder="Add Task..." />
  </form>
</template>

<script></script>

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
</style>
