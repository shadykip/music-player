import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackStore = defineStore('trackStore', () => {
    const tracks = ref([])
    const isLoading = ref(false)
  
    const fetchTracks = async () => {
      isLoading.value = true
      try {
        const res = await fetch('http://localhost:3000/api/tracks')
        tracks.value = await res.json()
      } catch (error) {
        console.error('Failed to fetch tracks:', error)
      } finally {
        isLoading.value = false
      }
    }
  
    return {
      tracks,
      isLoading,
      fetchTracks
    }
  })