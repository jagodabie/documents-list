<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  all: unset;
  cursor: pointer;
  font: normal bold 1.2em "Fira Sans", sans-serif;
  padding: 2px;
  margin: 0 1rem;
  border: 1px solid rgb(110, 133, 158);
  border-radius: 3px;
  padding: 0.5rem 1rem;
  background-color: #80a8d1;

  &:hover {
    opacity: 0.8;
  }
  &:focus-visible {
    outline: blue;
  }

  @media (max-width: 425px) {
    margin: 0 0.1rem;
    font-size: 0.8rem;
  }
}
</style>
