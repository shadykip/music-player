<template>
    <div class="container mt-5 text-center">
      <div v-if="track">
        <h2 class="mb-3">{{ track.title }}</h2>
        <p class="text-muted">{{ track.artist }}</p>
  
        <img
          :src="track.cover"
          :alt="track.title"
          class="img-fluid rounded shadow mb-3"
          style="max-width: 300px;"
        />
  
        <audio
          ref="audioEl"
          :src="track.src"
          @loadedmetadata="onReady"
          @ended="onEnd"
          controls
          autoplay
          class="w-100 mt-3"
        ></audio>
        
      <!-- Progress -->
<div class="mt-3">
  <div class="d-flex justify-content-between small text-muted">
    <span>{{ formatTime(currentTime) }}</span>
    <span>{{ formatTime(duration) }}</span>
  </div>

  <div
    class="progress rounded"
    style="height: 8px; cursor: pointer;"
    @click="seekAudio"
  >
    <div
      class="progress-bar bg-primary"
      role="progressbar"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</div>
      </div>
  
      <div v-else class="text-muted">
        Loading track...
      </div>


    </div>
  </template>
  

  <script setup>
  import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useTrackStore } from '@/stores/trackStore'
  import { usePlayerStore } from '@/stores/playerStore'
  
  const route = useRoute()
  const audioEl = ref(null)
  
  const trackStore = useTrackStore()
  const playerStore = usePlayerStore()
  
  const track = ref(null)

  
const currentTime = ref(0)
const duration = ref(0)
  
  const loadTrack = async () => {
    const id = route.params.id
    if (trackStore.tracks.length === 0) {
      await trackStore.fetchTracks()
    }
  
    track.value = trackStore.tracks.find(t => t.id.toString() === id)
  
    if (track.value) {
      playerStore.setAudioRef(audioEl.value)
      playerStore.setTrack(track.value)
    }
  }
  
  watch(() => route.params.id, loadTrack)
  onMounted(() => {
  loadTrack()
})

onUnmounted(() => {
  if (audioEl.value) {
    audioEl.value.removeEventListener('timeupdate', updateProgress)
  }
})
const onReady = () => {
  if (audioEl.value) {
    audioEl.value.addEventListener('timeupdate', updateProgress)
    duration.value = audioEl.value.duration
  }
  playerStore.isPlaying = true
}

  const onEnd = () => {
    playerStore.isPlaying = false
  }

  const progress = computed(() =>
  duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
)

const updateProgress = () => {
  if (audioEl.value) {
    currentTime.value = audioEl.value.currentTime
    duration.value = audioEl.value.duration
  }
}

// Triggered when user clicks progress bar
const seekAudio = e => {
  const bar = e.currentTarget
  const clickX = e.offsetX
  const barWidth = bar.offsetWidth
  const seekTime = (clickX / barWidth) * duration.value
  if (audioEl.value) {
    audioEl.value.currentTime = seekTime
  }
}

const formatTime = (time) => {
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
}
  </script>