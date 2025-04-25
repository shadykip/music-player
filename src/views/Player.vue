<template>
    <div class="container mt-4">
       <div class="mb-4">
        <NowPlaying />
      </div>
  
      <ProgressBar class="mb-3" /> 
  
      <AudioControls />
    </div>
  </template>
  
  <script setup>
  import NowPlaying from '@/components/Player/NowPlaying.vue'
  import AudioControls from '@/components/Player/AudioControls.vue'
  import ProgressBar from '@/components/Player/ProgressBar.vue'
  </script>

<style>

</style>