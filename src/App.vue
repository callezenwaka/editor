<template>
  <div class="editors">
    <EditorComponent v-model="content"></EditorComponent>
    <hr>
    <div class="button--wrapper">
      <button type="button"  class="button--item" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, ref, reactive } from 'vue';
import EditorComponent from '@/components/EditorComponent.vue';

const content = ref('');

// watch(content, () => {
//   console.log('content: ', content.value);
// });

const handleSubmit = async() => {
  console.log('content: ', content.value);
};

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
  width: 100%;
  /* height: 21rem; */
  margin: 0 auto;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1rem;
}

.button--wrapper {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.button--item {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
}

/* Wider screen */
@media screen and (min-width: 1020px) {
  .editors {
    background-color: #e6e4e4;
    width: 100%;
    /* height: 21rem; */
    margin: 0 auto;
    margin-top: 3rem;
    border-radius: 1rem;
    padding: 1rem;
  }
}
</style>
