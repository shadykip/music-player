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
          class="w-100 mt-3 d-none"
        ></audio>
        
      <!-- Progress -->
<div class="mt-3">
  <div class="d-flex justify-content-between small text-muted">
    <span>{{ formatTime(currentTime) }}</span>
    <span>{{ formatTime(duration) }}</span>
  </div>

  <div class="progress-container" @click="seekAudio">
    <div 
      class="progress-buffered"
      :style="{ width: `${bufferedProgress}%` }"
    ></div>
    <div class="progress-bar bg-primary" :style="{ width: `${progress}%` }"></div>
    
    <div 
      class="progress-handle" 
      :style="{ left: `${progress}%` }"
      @mousedown="startDrag"
    ></div>
  </div>
</div>
<!-- Custom Controls -->
<div class="d-flex justify-content-between align-items-center gap-3 mt-4">
  <div>
    <button @click="previousTrack" class="btn btn-outline-secondary">⏮️ Previous</button>

  </div>
  <div class="flex-grow-1">
    <!-- Skip Backward Button -->
  <button class="btn btn-outline-secondary" @click="rewind">
    <i class="bi bi-skip-backward-fill"></i>
  </button>

  <!-- Play/Pause Button -->
  <button class="btn btn-outline-primary" @click="togglePlay">
    <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
  </button>

  <!-- Skip Forward Button -->
  <button class="btn btn-outline-secondary" @click="forward">
    <i class="bi bi-skip-forward-fill"></i>
  </button>

  <!-- Volume Control -->
  <div>
    <button class="btn btn-outline-secondary" @click="toggleMute">
      <i :class="isMuted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill'"></i>
    </button>
  </div>
  <!-- Time Display -->
  <span class="text-muted small">
    {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
  </span>
  </div>
  <div>
    <button @click="nextTrack" class="btn btn-outline-secondary">⏭️ Next</button>
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
  const isDragging = ref(false)

  
  const track = ref(null)

  
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)
const volume = ref(1)  
const isMuted = ref(false)  // Mute state
const isShuffle = ref(false)  // Shuffle state
  
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
const togglePlay = () => {
  if (!audioEl.value) return
  if (isPlaying.value) {
    audioEl.value.pause()
    isPlaying.value = false
  } else {
    audioEl.value.play()
    isPlaying.value = true
  }
}
const onReady = () => {
  if (audioEl.value) {
    audioEl.value.addEventListener('timeupdate', updateProgress)
    duration.value = audioEl.value.duration
    audioEl.value.play()
    isPlaying.value = true
  }
}

const onEnd = () => {
  isPlaying.value = false
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
const rewind = () => {
  if (!audioEl.value) return
  // Rewind 10 seconds
  audioEl.value.currentTime -= 10
}

const forward = () => {
  if (!audioEl.value) return
  // Skip forward 10 seconds
  audioEl.value.currentTime += 10
}
// Adjust the volume
const setVolume = () => {
  if (audioEl.value) {
    audioEl.value.volume = volume.value
  }
}

// Toggle mute
const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (audioEl.value) {
    audioEl.value.muted = isMuted.value
  }
}

// Toggle shuffle
const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

const startDrag = (e) => {
  isDragging.value = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (isDragging.value && audioEl.value) {
    const progressContainer = e.target.closest('.progress-container')
    const progressWidth = progressContainer.offsetWidth
    const offsetX = e.clientX - progressContainer.offsetLeft
    const newProgress = Math.min(Math.max(0, (offsetX / progressWidth) * 100), 100)
    progress.value = newProgress
    audioEl.value.currentTime = (newProgress / 100) * audioEl.value.duration
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}
const bufferedProgress = computed(() => {
  if (audioEl.value && audioEl.value.buffered.length > 0) {
    const bufferedEnd = audioEl.value.buffered.end(audioEl.value.buffered.length - 1)
    return (bufferedEnd / audioEl.value.duration) * 100
  }
  return 0
})
// Function to change to the next track
const nextTrack = () => {
  if (!track.value) return

  const currentIndex = trackStore.tracks.findIndex(t => t.id === track.value.id)
  const nextTrack = trackStore.tracks[currentIndex + 1] || trackStore.tracks[0] // Loop back to the first track

  if (nextTrack) {
    track.value = nextTrack
    audioEl.value.src = nextTrack.src
    audioEl.value.play()
  }
}

// Function to go to the previous track
const previousTrack = () => {
  if (!track.value) return

  const currentIndex = trackStore.tracks.findIndex(t => t.id === track.value.id)
  const previousTrack = trackStore.tracks[currentIndex - 1] || trackStore.tracks[trackStore.tracks.length - 1] // Loop to the last track

  if (previousTrack) {
    track.value = previousTrack
    audioEl.value.src = previousTrack.src
    audioEl.value.play()
  }
}

  </script>

  <style scoped>
.progress-container {
  position: relative;
  height: 8px;
  background-color: #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.progress-bar {
  height: 100%;
  transition: width 0.1s ease-in-out;
}

.progress-buffered {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #6c757d; /* Buffered progress color */
  z-index: 1;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2; /* Ensure handle is on top */
  transition: left 0.1s ease-in-out;
}




</style>