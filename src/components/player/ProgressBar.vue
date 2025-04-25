<template>
   <div class="progress" style="height: 8px;">
    <div class="progress-bar" :style="{ width: progress + '%' }" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const progress = ref(45)
</script>

<style>

</style>