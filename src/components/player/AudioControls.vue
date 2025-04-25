<template>
   <div class="d-flex align-items-center gap-3">
    <button class="btn btn-outline-secondary" @click="prevTrack">
      ◀️
    </button>
    <button class="btn btn-primary" @click="togglePlay">
      {{ isPlaying ? '⏸️ Pause' : '▶️ Play' }}
    </button>
    <button class="btn btn-outline-secondary" @click="nextTrack">
      ▶️
    </button>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../../stores/playerStore'

const store = usePlayerStore()
const { isPlaying, play, pause } = store

const togglePlay = () => {
  isPlaying ? pause() : play()
}

// Placeholder for switching tracks
const prevTrack = () => console.log('Previous track')
const nextTrack = () => console.log('Next track')
</script>

<style>

</style>