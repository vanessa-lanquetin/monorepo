
<template>
  <div class="app-container">
    <div class="router-container">
      <RouterView />
    </div>
    <footer>
      <div><i class="far fa-copyright"></i> 2023 Vanessa Lanquetin</div>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  color: #ffea99;
  padding: 2% 0;
}
</style>
