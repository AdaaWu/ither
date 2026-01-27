<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight, ChevronDown, Code2 } from 'lucide-vue-next'
import { useCursorGlow } from '../composables/useCursorGlow'

interface Props {
  darkMode: boolean
}

defineProps<Props>()
const emit = defineEmits<{ join: [] }>()

const heroRef = ref<HTMLElement | null>(null)
const { glowX, glowY } = useCursorGlow(heroRef)

const titleChars = '科技，是新時代女性的文藝復興'.split('')
const charsVisible = ref(false)

onMounted(() => {
  setTimeout(() => { charsVisible.value = true }, 300)
})

const scrollToNext = () => {
  const el = document.getElementById('manifesto-ticker')
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    ref="heroRef"
    :class="[
      'relative min-h-screen flex flex-col overflow-hidden',
      darkMode ? 'bg-slate-950' : 'bg-parchment-50'
    ]"
  >
    <!-- ===== RICH BACKGROUND LAYERS ===== -->

    <!-- Layer 1: Base gradient (warm → cool sweep) -->
    <div
      :class="[
        'absolute inset-0',
        darkMode
          ? 'bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950'
          : 'bg-gradient-to-br from-parchment-100 via-indigo-50/60 to-pink-50/40'
      ]"
    />

    <!-- Layer 2: Large ambient blobs (bigger, more saturated) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div :class="darkMode ? 'opacity-30' : 'opacity-50'">
        <div :class="['absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-purple-600' : 'bg-purple-300']"></div>
        <div :class="['absolute -top-16 -right-32 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000', darkMode ? 'bg-indigo-600' : 'bg-indigo-300']"></div>
        <div :class="['absolute -bottom-32 left-1/4 w-[550px] h-[550px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000', darkMode ? 'bg-pink-600' : 'bg-pink-300']"></div>
        <div :class="['absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000', darkMode ? 'bg-violet-600' : 'bg-violet-200']"></div>
      </div>
    </div>

    <!-- Layer 3: Geometric decorative lines -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Top-left corner accent -->
      <svg class="absolute top-16 left-8 lg:left-16 w-48 h-48 opacity-[0.07]" :class="darkMode ? 'text-indigo-400' : 'text-indigo-600'" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="80" stroke-width="0.5" stroke-dasharray="4 6" />
        <circle cx="100" cy="100" r="60" stroke-width="0.5" />
        <line x1="20" y1="100" x2="180" y2="100" stroke-width="0.3" />
        <line x1="100" y1="20" x2="100" y2="180" stroke-width="0.3" />
      </svg>

      <!-- Bottom-right corner accent -->
      <svg class="absolute bottom-16 right-8 lg:right-16 w-64 h-64 opacity-[0.05]" :class="darkMode ? 'text-pink-400' : 'text-pink-600'" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <rect x="20" y="20" width="160" height="160" rx="8" stroke-width="0.5" stroke-dasharray="8 4" />
        <rect x="50" y="50" width="100" height="100" rx="4" stroke-width="0.5" />
        <line x1="0" y1="200" x2="200" y2="0" stroke-width="0.3" stroke-dasharray="6 8" />
      </svg>

      <!-- Scattered small dots -->
      <div :class="['absolute top-1/4 left-1/6 w-2 h-2 rounded-full', darkMode ? 'bg-indigo-500/20' : 'bg-indigo-400/20']"></div>
      <div :class="['absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full', darkMode ? 'bg-purple-500/20' : 'bg-purple-400/20']"></div>
      <div :class="['absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full', darkMode ? 'bg-pink-500/30' : 'bg-pink-400/30']"></div>
    </div>

    <!-- Layer 4: Grid texture -->
    <div class="absolute inset-0 grid-texture" />

    <!-- Layer 5: Cursor glow -->
    <div
      class="pointer-events-none absolute inset-0 z-0 transition-opacity"
      :style="{
        background: `radial-gradient(600px circle at ${glowX}px ${glowY}px, ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)'}, transparent 40%)`
      }"
    />

    <!-- Layer 6: Subtle vignette -->
    <div
      :class="[
        'absolute inset-0 pointer-events-none',
        darkMode
          ? 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.6)_100%)]'
          : 'bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(254,253,251,0.7)_100%)]'
      ]"
    />

    <!-- ===== CONTENT ===== -->

    <!-- Navbar -->
    <nav class="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
      <div class="flex items-center gap-3">
        <div class="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
          <Code2 class="w-6 h-6" />
        </div>
        <span class="text-xl font-bold tracking-tight">
          IT <span class="font-serif italic text-indigo-600">Her</span>
        </span>
      </div>
      <button
        @click="emit('join')"
        :class="[
          'px-6 py-2.5 rounded-full text-sm font-mono font-medium tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95',
          darkMode
            ? 'bg-white text-slate-900 hover:bg-slate-100'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        ]"
      >
        JOIN US
      </button>
    </nav>

    <!-- Hero Content -->
    <main class="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pb-24">
      <!-- Badge -->
      <div
        :class="[
          'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-10 backdrop-blur-sm',
          darkMode ? 'bg-white/5 border-white/10 text-indigo-300' : 'bg-white/70 border-indigo-200/60 text-indigo-600'
        ]"
        style="animation: fade-up 0.7s ease-out both; animation-delay: 0.1s;"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span class="text-xs font-mono font-semibold tracking-widest uppercase">專屬女性科技人的社群</span>
      </div>

      <!-- Main Title -->
      <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 max-w-5xl leading-tight">
        <span
          v-for="(char, i) in titleChars"
          :key="i"
          class="inline-block transition-all duration-500"
          :class="charsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${i * 60 + 400}ms` }"
        >
          <span
            :class="[
              char === '，' ? 'mx-1' : '',
              'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
            ]"
          >{{ char === ' ' ? '\u00A0' : char }}</span>
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        :class="[
          'font-mono text-base md:text-lg max-w-2xl mb-12 tracking-wide leading-relaxed',
          darkMode ? 'text-slate-400' : 'text-slate-500'
        ]"
        style="animation: fade-up 0.7s ease-out both; animation-delay: 1.8s;"
      >
        IT Her — 七大模組 · 一個歸屬
      </p>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4"
        style="animation: fade-up 0.7s ease-out both; animation-delay: 2.1s;"
      >
        <button
          @click="emit('join')"
          class="group px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 hover:gap-3"
        >
          開始妳的 Renaissance
          <ArrowRight class="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          @click="scrollToNext"
          :class="[
            'px-8 py-4 rounded-full border font-mono text-base tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-sm',
            darkMode
              ? 'border-slate-700 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              : 'border-slate-300/80 text-slate-500 hover:bg-white/60 hover:text-slate-700'
          ]"
        >
          EXPLORE
          <ChevronDown class="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </main>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div :class="['w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2', darkMode ? 'border-slate-600' : 'border-slate-300']">
        <div class="w-1.5 h-1.5 rounded-full animate-bounce bg-slate-400"></div>
      </div>
    </div>
  </section>
</template>
