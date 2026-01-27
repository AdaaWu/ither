import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useCursorGlow(containerRef: Ref<HTMLElement | null>): {
  glowX: Ref<number>
  glowY: Ref<number>
} {
  const glowX = ref(0)
  const glowY = ref(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    glowX.value = e.clientX - rect.left
    glowY.value = e.clientY - rect.top
  }

  onMounted(() => {
    containerRef.value?.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    containerRef.value?.removeEventListener('mousemove', handleMouseMove)
  })

  return { glowX, glowY }
}
