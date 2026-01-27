<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const testimonials = [
  {
    quote: '從非本科轉職前端，IT Her 的導師讓我少走了很多彎路。半年後我拿到了第一份 offer，現在我也成為了導師。',
    name: 'Alice Chen',
    title: 'Frontend Developer',
    company: 'Shopify',
    color: 'bg-indigo-500',
  },
  {
    quote: '在論壇分享後端架構心得，沒想到收到這麼多溫暖回饋。這裡讓我找到了在科技圈裡的歸屬感。',
    name: 'Betty Wang',
    title: 'Backend Engineer',
    company: 'LINE',
    color: 'bg-purple-500',
  },
  {
    quote: '這裡沒有人會因為妳問了基礎問題而嘲笑妳。IT Her 讓我重新相信，學習可以是安全的。',
    name: 'Carol Liu',
    title: 'Career Changer',
    company: 'Self-learning',
    color: 'bg-pink-500',
  },
]
</script>

<template>
  <section
    ref="containerRef"
    :class="['py-24 px-6 lg:px-12', darkMode ? 'bg-slate-900/50' : 'bg-parchment-100']"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-3xl md:text-5xl font-serif font-bold mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
        >
          她們的故事
        </h2>
      </div>

      <!-- Testimonial Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          :class="[
            'relative rounded-2xl border p-8 transition-all duration-700 hover:-translate-y-1',
            i === 1 ? 'md:scale-105 md:shadow-xl' : '',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode
              ? 'bg-slate-900/80 border-slate-700 hover:border-slate-600'
              : 'bg-white border-slate-200 hover:shadow-lg'
          ]"
          :style="{ transitionDelay: isRevealed ? `${(i + 2) * 150}ms` : '0ms' }"
        >
          <!-- Quote Mark -->
          <span
            :class="[
              'text-6xl font-serif leading-none block mb-4',
              darkMode ? 'text-indigo-500/30' : 'text-indigo-200'
            ]"
          >&ldquo;</span>

          <!-- Quote Text -->
          <p :class="['font-serif italic text-base leading-relaxed mb-8', darkMode ? 'text-slate-300' : 'text-slate-600']">
            {{ t.quote }}
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3 mt-auto">
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm', t.color]">
              {{ t.name[0] }}
            </div>
            <div>
              <div :class="['font-semibold text-sm', darkMode ? 'text-white' : 'text-slate-900']">{{ t.name }}</div>
              <div :class="['font-mono text-xs', darkMode ? 'text-slate-500' : 'text-slate-400']">
                {{ t.title }} @ {{ t.company }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
