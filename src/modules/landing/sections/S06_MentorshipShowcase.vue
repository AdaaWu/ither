<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useCounterAnimation } from '../composables/useCounterAnimation'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()
const matchRate = useCounterAnimation(95, isRevealed)

const mentors = [
  { name: 'Diana', title: 'Staff Engineer @ Google', skills: ['System Design', 'Go', 'Leadership'], color: 'bg-purple-500' },
  { name: 'Eva', title: 'VP of Engineering', skills: ['Management', 'Strategy', 'Scaling'], color: 'bg-pink-500' },
  { name: 'Fiona', title: 'Senior SRE @ Meta', skills: ['DevOps', 'Kubernetes', 'Monitoring'], color: 'bg-indigo-500' },
]

const mentees = [
  { name: 'Grace', title: '轉職前端工程師', goal: '找到第一份工程師工作', color: 'bg-teal-500' },
  { name: 'Helen', title: 'Junior Backend Dev', goal: '晉升 Mid-level', color: 'bg-amber-500' },
  { name: 'Iris', title: 'QA Engineer', goal: '轉向 SRE 領域', color: 'bg-rose-500' },
]
</script>

<template>
  <section
    ref="containerRef"
    :class="['relative py-24 px-6 lg:px-12 overflow-hidden', darkMode ? 'bg-slate-900/50' : 'bg-white']"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div :class="darkMode ? 'opacity-15' : 'opacity-30'">
        <div :class="['absolute -top-16 -left-16 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-purple-600' : 'bg-purple-100']"></div>
        <div :class="['absolute -bottom-24 -right-16 w-[450px] h-[450px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000', darkMode ? 'bg-pink-600' : 'bg-pink-100']"></div>
      </div>
    </div>
    <div class="absolute inset-0 parchment-bg pointer-events-none" />

    <div class="relative max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <span
          :class="[
            'font-mono text-xs tracking-widest uppercase block mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100' : 'opacity-0',
            darkMode ? 'text-pink-400' : 'text-pink-600'
          ]"
        >
          MENTORSHIP MODULE
        </span>
        <h2
          :class="[
            'text-3xl md:text-5xl font-serif font-bold mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
          style="transition-delay: 100ms"
        >
          找到妳的導師，成為她人的燈塔
        </h2>
      </div>

      <!-- Connection Visualization -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        <!-- Mentors Column -->
        <div class="space-y-4">
          <h3 :class="['text-sm font-mono tracking-widest uppercase text-center mb-6', darkMode ? 'text-purple-400' : 'text-purple-600']">
            MENTORS
          </h3>
          <div
            v-for="(mentor, i) in mentors"
            :key="mentor.name"
            :class="[
              'flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500',
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
              darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
            ]"
            :style="{ transitionDelay: isRevealed ? `${(i + 2) * 150}ms` : '0ms' }"
          >
            <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg', mentor.color]">
              {{ mentor.name[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <div :class="['font-semibold', darkMode ? 'text-white' : 'text-slate-900']">{{ mentor.name }}</div>
              <div :class="['text-xs font-mono truncate', darkMode ? 'text-slate-400' : 'text-slate-500']">{{ mentor.title }}</div>
              <div class="flex flex-wrap gap-1 mt-1.5">
                <span
                  v-for="skill in mentor.skills"
                  :key="skill"
                  :class="[
                    'text-[10px] font-mono px-2 py-0.5 rounded-full',
                    darkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-50 text-purple-600'
                  ]"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Connection -->
        <div
          :class="[
            'flex flex-col items-center justify-center py-8 transition-all duration-700',
            isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          ]"
          style="transition-delay: 600ms"
        >
          <!-- Match Rate -->
          <div :class="['text-center mb-4', darkMode ? 'text-white' : 'text-slate-900']">
            <div class="text-5xl font-mono font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {{ matchRate }}%
            </div>
            <div :class="['text-xs font-mono mt-1', darkMode ? 'text-slate-500' : 'text-slate-400']">
              MATCH RATE
            </div>
          </div>

          <!-- Connection Lines (SVG) -->
          <svg class="w-16 h-32 hidden lg:block" viewBox="0 0 64 128">
            <line
              v-for="i in 3"
              :key="i"
              x1="0" :y1="20 + (i-1) * 40"
              x2="64" :y2="20 + (i-1) * 40"
              :stroke="darkMode ? '#6366f1' : '#818cf8'"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              :class="isRevealed ? 'animate-draw-line' : ''"
              :style="{ strokeDashoffset: isRevealed ? 0 : 100 }"
            />
          </svg>
        </div>

        <!-- Mentees Column -->
        <div class="space-y-4">
          <h3 :class="['text-sm font-mono tracking-widest uppercase text-center mb-6', darkMode ? 'text-teal-400' : 'text-teal-600']">
            MENTEES
          </h3>
          <div
            v-for="(mentee, i) in mentees"
            :key="mentee.name"
            :class="[
              'flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500',
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
              darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
            ]"
            :style="{ transitionDelay: isRevealed ? `${(i + 2) * 150}ms` : '0ms' }"
          >
            <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg', mentee.color]">
              {{ mentee.name[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <div :class="['font-semibold', darkMode ? 'text-white' : 'text-slate-900']">{{ mentee.name }}</div>
              <div :class="['text-xs font-mono', darkMode ? 'text-slate-400' : 'text-slate-500']">{{ mentee.title }}</div>
              <div :class="['text-xs mt-1', darkMode ? 'text-teal-400' : 'text-teal-600']">
                目標：{{ mentee.goal }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <div
        :class="[
          'mt-16 text-center max-w-2xl mx-auto transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
        style="transition-delay: 900ms"
      >
        <p :class="['font-serif italic text-lg leading-relaxed', darkMode ? 'text-slate-300' : 'text-slate-600']">
          「從非本科轉職前端，IT Her 的導師讓我少走了很多彎路。現在我也成為了導師，想把這份溫暖傳下去。」
        </p>
        <div :class="['mt-4 font-mono text-sm', darkMode ? 'text-slate-500' : 'text-slate-400']">
          — Alice, Frontend Developer @ Shopify
        </div>
      </div>
    </div>
  </section>
</template>
