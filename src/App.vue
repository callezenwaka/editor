<template>
  <div class="editors">
    <Editor></Editor>
  </div>
</template>

<script setup>
import Editor from './components/Editor.vue'
</script>

<style scoped>
body {
  font-family: "Roboto";
  font-size: 16px;
  background-color: #ffffff;
  color: #000000;
}

.editors {
  background-color: #e6e4e4;
  max-width: 75%;
  /* height: 21rem; */
  margin: 0 auto;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
