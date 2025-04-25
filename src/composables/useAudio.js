import { onUnmounted, ref } from "vue"

export function useAudio(src){
    const audio = new Audio(src)
    const playing = ref(false)

    const toggle = () => {
        if (playing.value) {
            audio.pause()
        } else {
            audio.play()
        }
        playing.value = !playing.value
    }

    onUnmounted(() => {
        audio.pause()
        audio.src = ""
    })
    return {
        audio,
        playing,
        toggle
    }
}