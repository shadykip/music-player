import { defineStore } from "pinia"
import { ref } from 'vue'

export const  usePlayerStore = defineStore('player', ()=>{
    const currentTrack = ref(null)
    const isPlaying = ref(false)
    const playlist = ref([])
    const volume = ref(0.8)

    const play = ()=>{
        isPlaying.value = true
    }
    const pause = ()=>{
        isPlaying.value = false
    }
    const setTrack = (track)=>{
        currentTrack.value = track
    }
    return {
        currentTrack,
        isPlaying,
        playlist,
        volume,
        play,
        pause,
        setTrack
    }
})
