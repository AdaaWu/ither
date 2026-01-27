import { ref, watch, type Ref } from 'vue'

export function useCounterAnimation(
  target: number,
  trigger: Ref<boolean>,
  duration = 2000
): Ref<number> {
  const current = ref(0)

  watch(trigger, (val) => {
    if (!val) return
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      current.value = Math.round(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })

  return current
}
