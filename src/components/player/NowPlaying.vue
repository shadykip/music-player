<template>
  <div class="d-flex align-items-center gap-3">
    <img :src="currentTrack?.cover || 'https://placehold.co/50'" class="rounded" width="50" height="50" />
    <div>
      <h6 class="mb-0">{{ currentTrack?.title || 'No track playing' }}</h6>
      <small class="text-muted">{{ currentTrack?.artist || '' }}</small>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from "@/stores/playerStore"

const { currentTrack } = usePlayerStore()
</script>

<style>

</style>