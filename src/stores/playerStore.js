import { defineStore } from "pinia"
import { ref } from 'vue'

export const  usePlayerStore = defineStore('player', ()=>{
    const currentTrack = ref(null)
    const isPlaying = ref(false)
    const audioRef = ref(null) // ✅ this is your audio element

    const setAudioRef = (el) => {
      audioRef.value = el
    }
  
    const setTrack = (track) => {
      currentTrack.value = track
      if (audioRef.value) {
        audioRef.value.pause()
        audioRef.value.src = track.src
        audioRef.value.load()
        audioRef.value.play()
        isPlaying.value = true
      }
    }
  
    const play = () => {
      audioRef.value?.play()
      isPlaying.value = true
    }
  
    const pause = () => {
      audioRef.value?.pause()
      isPlaying.value = false
    }
      return {
        currentTrack,
        isPlaying,
        setTrack,
        setAudioRef,
        play,
        pause
      }
})
