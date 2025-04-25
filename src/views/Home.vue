<template>
    <div class="container mt-5">
      <h2 class="mb-4">🎵 Available Tracks</h2>
  
      <div v-if="isLoading" class="text-muted">Loading...</div>
  
      <div v-else-if="tracks.length === 0" class="text-muted">No tracks found.</div>
  
      <div v-else class="row">
        <div
          v-for="track in tracks"
          :key="track.id"
          class="col-md-4 mb-4"
        >
          <div class="card h-100">
            <img :src="track.cover" class="card-img-top" :alt="track.title" />
            <div class="card-body">
              <h5 class="card-title">{{ track.title }}</h5>
              <p class="card-text">{{ track.artist }}</p>
              <router-link
                :to="`/player/${track.id}`"
                class="btn btn-outline-primary btn-sm"
              >
                ▶️ Play
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue'
  import { useTrackStore } from '@/stores/trackStore'
  
  const trackStore = useTrackStore()
  
  const tracks = computed(() => trackStore.tracks)
  const isLoading = computed(() => trackStore.isLoading)
  
  onMounted(() => {
    if (trackStore.tracks.length === 0) {
      trackStore.fetchTracks()
    }
  })
  </script>
  