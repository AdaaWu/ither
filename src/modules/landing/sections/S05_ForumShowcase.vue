<script setup lang="ts">
import { Code, Briefcase, Brain, Compass, Coffee } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const categories = [
  {
    icon: Code,
    name: '前端技術',
    color: 'indigo',
    topics: ['Vue 3 Composition API 最佳實踐', 'CSS Container Queries 實戰', 'TypeScript 泛型深入淺出'],
  },
  {
    icon: Brain,
    name: '後端架構',
    color: 'purple',
    topics: ['微服務 vs 單體架構的抉擇', 'PostgreSQL 效能調校心得', 'API 設計原則分享'],
  },
  {
    icon: Briefcase,
    name: '職涯發展',
    color: 'pink',
    topics: ['從 IC 到 Tech Lead 的心路歷程', '薪資談判的實用技巧', '遠端工作的時間管理'],
  },
  {
    icon: Compass,
    name: '學習資源',
    color: 'amber',
    topics: ['2026 年必學的前端框架', '推薦的系統設計課程', '免費的 AI/ML 學習路徑'],
  },
  {
    icon: Coffee,
    name: '自由討論',
    color: 'teal',
    topics: ['工程師的居家辦公桌面分享', '推薦好用的開發工具', '本週的小確幸時刻'],
  },
]

const colorMap: Record<string, { bg: string; bgDark: string; text: string; textDark: string }> = {
  indigo: { bg: 'bg-indigo-50', bgDark: 'bg-indigo-500/10', text: 'text-indigo-600', textDark: 'text-indigo-400' },
  purple: { bg: 'bg-purple-50', bgDark: 'bg-purple-500/10', text: 'text-purple-600', textDark: 'text-purple-400' },
  pink: { bg: 'bg-pink-50', bgDark: 'bg-pink-500/10', text: 'text-pink-600', textDark: 'text-pink-400' },
  amber: { bg: 'bg-amber-50', bgDark: 'bg-amber-500/10', text: 'text-amber-600', textDark: 'text-amber-400' },
  teal: { bg: 'bg-teal-50', bgDark: 'bg-teal-500/10', text: 'text-teal-600', textDark: 'text-teal-400' },
}
</script>

<template>
  <section
    ref="containerRef"
    :class="['relative py-24 px-6 lg:px-12 overflow-hidden', darkMode ? 'bg-slate-950' : 'bg-parchment-50']"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div :class="darkMode ? 'opacity-20' : 'opacity-35'">
        <div :class="['absolute -top-16 left-1/4 w-[450px] h-[450px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-purple-600' : 'bg-purple-200']"></div>
        <div :class="['absolute -bottom-24 -right-16 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000', darkMode ? 'bg-indigo-600' : 'bg-indigo-200']"></div>
      </div>
    </div>
    <div class="absolute inset-0 grid-texture pointer-events-none" />

    <!-- Themed SVG: stacked document cards -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <svg class="absolute top-8 right-16 w-40 h-40" :class="darkMode ? 'opacity-[0.04]' : 'opacity-[0.05]'" viewBox="0 0 200 200" fill="none" :stroke="darkMode ? '#c084fc' : '#9333ea'" stroke-width="1">
        <rect x="20" y="30" width="120" height="150" rx="8" />
        <rect x="35" y="15" width="120" height="150" rx="8" />
        <rect x="50" y="0" width="120" height="150" rx="8" />
        <line x1="65" y1="30" x2="150" y2="30" stroke-width="0.5" />
        <line x1="65" y1="50" x2="140" y2="50" stroke-width="0.5" />
        <line x1="65" y1="70" x2="130" y2="70" stroke-width="0.5" />
      </svg>
      <svg class="absolute bottom-12 left-8 w-32 h-32" :class="darkMode ? 'opacity-[0.03]' : 'opacity-[0.04]'" viewBox="0 0 100 100" fill="none" :stroke="darkMode ? '#818cf8' : '#6366f1'" stroke-width="0.8">
        <rect x="5" y="5" width="60" height="80" rx="4" />
        <line x1="15" y1="20" x2="55" y2="20" stroke-width="0.5" />
        <line x1="15" y1="35" x2="50" y2="35" stroke-width="0.5" />
        <line x1="15" y1="50" x2="45" y2="50" stroke-width="0.5" />
      </svg>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <span
          :class="[
            'font-mono text-xs tracking-widest uppercase block mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100' : 'opacity-0',
            darkMode ? 'text-purple-400' : 'text-purple-600'
          ]"
        >
          FORUM MODULE
        </span>
        <h2
          :class="[
            'text-3xl md:text-5xl font-serif font-bold mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
          style="transition-delay: 100ms"
        >
          妳的技術觀點，值得被聽見
        </h2>
      </div>

      <!-- Category Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="(cat, i) in categories"
          :key="cat.name"
          :class="[
            'group rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode
              ? 'bg-slate-900/60 border-slate-800 hover:border-slate-600'
              : 'bg-white/80 border-slate-200 hover:border-slate-300'
          ]"
          :style="{ transitionDelay: isRevealed ? `${(i + 2) * 100}ms` : '0ms' }"
        >
          <!-- Icon -->
          <div :class="[
            'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
            darkMode ? colorMap[cat.color].bgDark : colorMap[cat.color].bg
          ]">
            <component
              :is="cat.icon"
              :class="['w-5 h-5', darkMode ? colorMap[cat.color].textDark : colorMap[cat.color].text]"
            />
          </div>

          <!-- Name -->
          <h3 :class="['font-serif font-bold text-lg mb-4', darkMode ? 'text-white' : 'text-slate-900']">
            {{ cat.name }}
          </h3>

          <!-- Topics -->
          <ul class="space-y-2">
            <li
              v-for="topic in cat.topics"
              :key="topic"
              :class="['text-xs leading-relaxed pl-3 border-l-2', darkMode ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-200']"
            >
              {{ topic }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Stats -->
      <div
        :class="[
          'mt-12 text-center transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          darkMode ? 'text-slate-500' : 'text-slate-400'
        ]"
        style="transition-delay: 800ms"
      >
        <span class="font-mono text-sm tracking-wide">
          <span :class="darkMode ? 'text-lime-400' : 'text-indigo-600'">1,247</span> 篇文章
          <span class="mx-3">·</span>
          <span :class="darkMode ? 'text-lime-400' : 'text-indigo-600'">892</span> 位作者
          <span class="mx-3">·</span>
          <span :class="darkMode ? 'text-lime-400' : 'text-indigo-600'">5</span> 大分類
        </span>
      </div>
    </div>
  </section>
</template>
