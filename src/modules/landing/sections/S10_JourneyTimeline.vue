<script setup lang="ts">
import { UserPlus, MessageSquare, Users, Rocket, Heart } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const milestones = [
  { time: 'Day 1', icon: UserPlus, title: '加入社群', desc: '完成 Profile 設置，進入聊天室打聲招呼', color: 'bg-indigo-500' },
  { time: 'Week 1', icon: MessageSquare, title: '第一個問題', desc: '在論壇發出第一個技術問題，收到 5 則溫暖回覆', color: 'bg-purple-500' },
  { time: 'Month 1', icon: Users, title: '配對導師', desc: '找到合適的導師，開始每週 1:1 技術指導', color: 'bg-pink-500' },
  { time: 'Month 3', icon: Rocket, title: 'Side Project', desc: '完成第一個 Side Project，分享到 Marketplace', color: 'bg-amber-500' },
  { time: 'Month 6', icon: Heart, title: '成為導師', desc: '累積足夠經驗，開始幫助下一位新人', color: 'bg-teal-500' },
]
</script>

<template>
  <section
    ref="containerRef"
    :class="['relative py-24 px-6 lg:px-12 overflow-hidden', darkMode ? 'bg-slate-950' : 'bg-parchment-50']"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div :class="darkMode ? 'opacity-20' : 'opacity-30'">
        <div :class="['absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-indigo-600' : 'bg-indigo-200']"></div>
        <div :class="['absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000', darkMode ? 'bg-pink-600' : 'bg-pink-200']"></div>
      </div>
    </div>
    <div class="absolute inset-0 grid-texture pointer-events-none" />

    <div class="relative max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-3xl md:text-5xl font-serif font-bold mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
        >
          妳的旅程地圖
        </h2>
        <p
          :class="[
            'text-lg transition-all duration-700',
            isRevealed ? 'opacity-100' : 'opacity-0',
            darkMode ? 'text-slate-400' : 'text-slate-500'
          ]"
          style="transition-delay: 200ms"
        >
          從加入到成為導師，每一步都有人陪伴
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical Line -->
        <div
          :class="[
            'absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 transition-all duration-1000 ease-out',
            darkMode ? 'bg-slate-800' : 'bg-slate-200'
          ]"
          :style="{ height: isRevealed ? '100%' : '0%' }"
        ></div>

        <!-- Nodes -->
        <div class="space-y-12">
          <div
            v-for="(ms, i) in milestones"
            :key="ms.time"
            :class="[
              'relative flex items-start gap-6 transition-all duration-700',
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            ]"
            :style="{ transitionDelay: isRevealed ? `${(i + 2) * 200}ms` : '0ms' }"
          >
            <!-- Dot -->
            <div
              :class="[
                'absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 ring-4 transition-all duration-500',
                ms.color,
                isRevealed ? 'scale-100' : 'scale-0',
                darkMode ? 'ring-slate-950' : 'ring-parchment-50'
              ]"
              :style="{ transitionDelay: isRevealed ? `${(i + 2) * 200 + 100}ms` : '0ms' }"
            >
              <component :is="ms.icon" class="w-5 h-5 text-white" />
            </div>

            <!-- Content -->
            <div
              :class="[
                'ml-20 md:ml-0 md:w-[calc(50%-3rem)] p-5 rounded-xl border transition-all duration-500',
                i % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto',
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              ]"
            >
              <span :class="['font-mono text-xs tracking-widest', darkMode ? 'text-lime-400' : 'text-indigo-600']">
                {{ ms.time }}
              </span>
              <h3 :class="['font-serif text-lg font-bold mt-1', darkMode ? 'text-white' : 'text-slate-900']">
                {{ ms.title }}
              </h3>
              <p :class="['text-sm mt-1', darkMode ? 'text-slate-400' : 'text-slate-500']">
                {{ ms.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
