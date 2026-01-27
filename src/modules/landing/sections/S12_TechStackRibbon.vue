<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const techs = ['Vue 3', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Vite', 'Lucide']
</script>

<template>
  <section
    ref="containerRef"
    :class="['py-16 px-6 lg:px-12 grid-texture', darkMode ? 'bg-slate-950' : 'bg-slate-50']"
  >
    <div class="max-w-4xl mx-auto text-center">
      <!-- Tech logos -->
      <div
        :class="[
          'flex flex-wrap items-center justify-center gap-8 mb-6 transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        ]"
      >
        <span
          v-for="(tech, i) in techs"
          :key="tech"
          :class="[
            'font-mono text-sm tracking-wide transition-all duration-300',
            darkMode
              ? 'text-slate-600 hover:text-slate-300'
              : 'text-slate-400 hover:text-slate-700'
          ]"
          :style="{ transitionDelay: isRevealed ? `${(i + 1) * 100}ms` : '0ms' }"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Tagline -->
      <p
        :class="[
          'font-mono text-sm tracking-widest transition-all duration-700',
          isRevealed ? 'opacity-100' : 'opacity-0',
          darkMode ? 'text-slate-500' : 'text-slate-400'
        ]"
        style="transition-delay: 700ms"
      >
        Built by women, for women in tech.
      </p>
    </div>
  </section>
</template>
