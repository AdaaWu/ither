import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(threshold = 0.15): {
  containerRef: Ref<HTMLElement | null>
  isRevealed: Ref<boolean>
} {
  const containerRef = ref<HTMLElement | null>(null)
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isRevealed.value = true
          observer?.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(containerRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { containerRef, isRevealed }
}
