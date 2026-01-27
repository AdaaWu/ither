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
    :class="['py-24 px-6 lg:px-12', darkMode ? 'bg-black' : 'bg-slate-900']"
  >
    <div class="max-w-5xl mx-auto">
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
          <div class="text-5xl md:text-7xl font-mono font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
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
