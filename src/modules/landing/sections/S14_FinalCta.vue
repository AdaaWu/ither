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

    <!-- Rotating gradient orb -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full rotating-gradient opacity-40 blur-3xl"></div>
    </div>

    <!-- Parchment texture overlay -->
    <div class="absolute inset-0 opacity-10 parchment-bg"></div>

    <!-- Grid texture overlay -->
    <div class="absolute inset-0 opacity-20 grid-texture"></div>

    <!-- Renaissance flourish frame (four corners) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Top-left -->
      <svg class="absolute top-6 left-6 w-32 h-32 opacity-[0.15]" viewBox="0 0 120 120" fill="none" stroke="white" stroke-width="1">
        <path d="M5,60 Q5,5 60,5" />
        <path d="M10,50 Q10,10 50,10" stroke-dasharray="4 4" />
        <circle cx="60" cy="5" r="2.5" fill="white" />
        <circle cx="5" cy="60" r="2.5" fill="white" />
        <path d="M8,40 C15,25 25,18 40,12 C28,20 20,30 15,45" />
      </svg>
      <!-- Top-right -->
      <svg class="absolute top-6 right-6 w-32 h-32 opacity-[0.15] scale-x-[-1]" viewBox="0 0 120 120" fill="none" stroke="white" stroke-width="1">
        <path d="M5,60 Q5,5 60,5" />
        <path d="M10,50 Q10,10 50,10" stroke-dasharray="4 4" />
        <circle cx="60" cy="5" r="2.5" fill="white" />
        <circle cx="5" cy="60" r="2.5" fill="white" />
        <path d="M8,40 C15,25 25,18 40,12 C28,20 20,30 15,45" />
      </svg>
      <!-- Bottom-left -->
      <svg class="absolute bottom-6 left-6 w-32 h-32 opacity-[0.15] scale-y-[-1]" viewBox="0 0 120 120" fill="none" stroke="white" stroke-width="1">
        <path d="M5,60 Q5,5 60,5" />
        <path d="M10,50 Q10,10 50,10" stroke-dasharray="4 4" />
        <circle cx="60" cy="5" r="2.5" fill="white" />
        <circle cx="5" cy="60" r="2.5" fill="white" />
        <path d="M8,40 C15,25 25,18 40,12 C28,20 20,30 15,45" />
      </svg>
      <!-- Bottom-right -->
      <svg class="absolute bottom-6 right-6 w-32 h-32 opacity-[0.15] scale-[-1]" viewBox="0 0 120 120" fill="none" stroke="white" stroke-width="1">
        <path d="M5,60 Q5,5 60,5" />
        <path d="M10,50 Q10,10 50,10" stroke-dasharray="4 4" />
        <circle cx="60" cy="5" r="2.5" fill="white" />
        <circle cx="5" cy="60" r="2.5" fill="white" />
        <path d="M8,40 C15,25 25,18 40,12 C28,20 20,30 15,45" />
      </svg>
      <!-- Decorative border lines -->
      <div class="absolute top-4 left-4 right-4 bottom-4 border border-white/[0.08] rounded-xl pointer-events-none"></div>
    </div>

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
