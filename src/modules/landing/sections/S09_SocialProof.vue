<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useCounterAnimation } from '../composables/useCounterAnimation'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const stats = [
  { value: 2400, suffix: '+', label: '社群成員', target: 2400 },
  { value: 150, suffix: '+', label: '導師', target: 150 },
  { value: 5000, suffix: '+', label: '篇討論', target: 5000 },
  { value: 98, suffix: '%', label: '推薦率', target: 98 },
]

const counters = stats.map(s => useCounterAnimation(s.target, isRevealed))
</script>

<template>
  <section
    ref="containerRef"
    :class="['relative py-24 px-6 lg:px-12 overflow-hidden', darkMode ? 'bg-black' : 'bg-slate-900']"
  >
    <!-- Radial light rays -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3)_0%,transparent_70%)]"></div>
      </div>
      <!-- Radiating lines -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        <line v-for="i in 12" :key="i" x1="400" y1="200" :x2="400 + Math.cos((i * 30) * Math.PI / 180) * 400" :y2="200 + Math.sin((i * 30) * Math.PI / 180) * 400" stroke="white" stroke-width="0.5" />
      </svg>
    </div>

    <div class="relative max-w-5xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          :class="[
            'text-center transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ]"
          :style="{ transitionDelay: `${(i + 1) * 150}ms` }"
        >
          <div class="text-5xl md:text-7xl font-mono font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 text-glow">
            {{ counters[i].value.toLocaleString() }}{{ stat.suffix }}
          </div>
          <div class="text-slate-400 text-sm font-mono tracking-wide">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
