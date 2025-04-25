import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackStore = defineStore('trackStore', () => {
    const tracks = ref([])
    const isLoading = ref(false)
    const playlists = ref([]) 
  
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
    const fetchPlaylists = async () => {
      if (isAuthenticated.value) {
        try {
          const res = await axios.get('http://localhost:3000/api/playlist', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          playlists.value = res.data
        } catch (error) {
          console.error('Failed to fetch playlists:', error)
        }
      }
    }
  
    return {
      tracks,
      playlists,
      isLoading,
      fetchTracks,
      fetchPlaylists
    }
  })