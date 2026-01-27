<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()
const emit = defineEmits<{ join: [] }>()

const { containerRef, isRevealed } = useScrollReveal()
</script>

<template>
  <section
    ref="containerRef"
    class="relative py-32 px-6 lg:px-12 overflow-hidden"
  >
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>

    <!-- Parchment texture overlay -->
    <div class="absolute inset-0 opacity-10 parchment-bg"></div>

    <!-- Grid texture overlay -->
    <div class="absolute inset-0 opacity-20 grid-texture"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-3xl mx-auto text-center">
      <h2
        :class="[
          'text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
      >
        妳的文藝復興，從這裡開始
      </h2>

      <p
        :class="[
          'text-lg md:text-xl text-white/80 mb-12 max-w-xl mx-auto transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
        style="transition-delay: 200ms"
      >
        加入 2,400+ 位女性科技人，一起重新定義科技的溫度。
      </p>

      <button
        @click="emit('join')"
        :class="[
          'group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-indigo-700 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 animate-glow-pulse',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
        style="transition-delay: 400ms"
      >
        立即加入 IT Her
        <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </section>
</template>
