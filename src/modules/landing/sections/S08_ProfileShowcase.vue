<script setup lang="ts">
import { Target, TrendingUp, Award } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useCounterAnimation } from '../composables/useCounterAnimation'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()
const postCount = useCounterAnimation(47, isRevealed)
const replyCount = useCounterAnimation(128, isRevealed)
const reviewCount = useCounterAnimation(15, isRevealed)

const goals = [
  { text: '學完 TypeScript 進階', progress: 85 },
  { text: '完成 Side Project MVP', progress: 60 },
  { text: '參加 3 場技術分享', progress: 33 },
]

const skills = ['Vue.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker']
</script>

<template>
  <section
    ref="containerRef"
    :class="['relative py-24 px-6 lg:px-12 overflow-hidden', darkMode ? 'bg-slate-900/50' : 'bg-white']"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div :class="darkMode ? 'opacity-15' : 'opacity-30'">
        <div :class="['absolute top-1/3 -right-16 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-blue-600' : 'bg-blue-100']"></div>
        <div :class="['absolute -bottom-16 left-1/3 w-[350px] h-[350px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000', darkMode ? 'bg-indigo-600' : 'bg-indigo-100']"></div>
      </div>
    </div>
    <div class="absolute inset-0 parchment-bg pointer-events-none" />

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Mock Profile UI -->
      <div
        :class="[
          'rounded-2xl border shadow-xl p-6 transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        ]"
      >
        <!-- Profile Header -->
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            S
          </div>
          <div>
            <div :class="['text-xl font-bold', darkMode ? 'text-white' : 'text-slate-900']">Sunny</div>
            <div class="font-mono text-xs" :class="darkMode ? 'text-indigo-400' : 'text-indigo-600'">Frontend Engineer</div>
            <div class="flex gap-1 mt-1">
              <span :class="['text-[10px] px-2 py-0.5 rounded-full font-mono', darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600']">
                Active
              </span>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="mb-6">
          <div :class="['text-xs font-mono tracking-widest uppercase mb-3', darkMode ? 'text-slate-500' : 'text-slate-400']">SKILLS</div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in skills"
              :key="skill"
              :class="[
                'text-xs font-mono px-3 py-1 rounded-full',
                darkMode ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
              ]"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Goals Progress -->
        <div class="mb-6">
          <div :class="['text-xs font-mono tracking-widest uppercase mb-3', darkMode ? 'text-slate-500' : 'text-slate-400']">GOALS</div>
          <div class="space-y-3">
            <div v-for="(goal, i) in goals" :key="i">
              <div class="flex justify-between items-center mb-1">
                <span :class="['text-sm', darkMode ? 'text-slate-300' : 'text-slate-700']">{{ goal.text }}</span>
                <span :class="['font-mono text-xs', darkMode ? 'text-indigo-400' : 'text-indigo-600']">{{ goal.progress }}%</span>
              </div>
              <div :class="['w-full h-2 rounded-full overflow-hidden', darkMode ? 'bg-slate-800' : 'bg-slate-100']">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                  :style="{ width: isRevealed ? `${goal.progress}%` : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div :class="['grid grid-cols-3 gap-4 pt-4 border-t', darkMode ? 'border-slate-800' : 'border-slate-100']">
          <div class="text-center">
            <div :class="['text-2xl font-mono font-bold', darkMode ? 'text-white' : 'text-slate-900']">{{ postCount }}</div>
            <div :class="['text-xs', darkMode ? 'text-slate-500' : 'text-slate-400']">發文</div>
          </div>
          <div class="text-center">
            <div :class="['text-2xl font-mono font-bold', darkMode ? 'text-white' : 'text-slate-900']">{{ replyCount }}</div>
            <div :class="['text-xs', darkMode ? 'text-slate-500' : 'text-slate-400']">回覆</div>
          </div>
          <div class="text-center">
            <div :class="['text-2xl font-mono font-bold', darkMode ? 'text-white' : 'text-slate-900']">{{ reviewCount }}</div>
            <div :class="['text-xs', darkMode ? 'text-slate-500' : 'text-slate-400']">書評</div>
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div>
        <span
          :class="[
            'font-mono text-xs tracking-widest uppercase block mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100' : 'opacity-0',
            darkMode ? 'text-blue-400' : 'text-blue-600'
          ]"
          style="transition-delay: 200ms"
        >
          PROFILE MODULE
        </span>
        <h2
          :class="[
            'text-3xl md:text-4xl font-serif font-bold mb-6 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
          style="transition-delay: 300ms"
        >
          記錄每一步，見證妳的蛻變
        </h2>
        <p
          :class="[
            'text-lg leading-relaxed mb-10 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-slate-400' : 'text-slate-600'
          ]"
          style="transition-delay: 400ms"
        >
          這不只是一個社群——這是妳的成長平台。設定目標、追蹤進度、累積成就，每一個里程碑都值得被記住。
        </p>

        <div class="space-y-6">
          <div
            v-for="(feat, i) in [
              { icon: Target, title: '目標追蹤', desc: '設定學習與職涯目標，視覺化追蹤進度' },
              { icon: TrendingUp, title: '成長數據', desc: '發文、回覆、書評，量化妳的社群貢獻' },
              { icon: Award, title: '成就徽章', desc: '達成里程碑獲得徽章，展示妳的專業旅程' },
            ]"
            :key="i"
            :class="[
              'flex items-start gap-4 transition-all duration-700',
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            ]"
            :style="{ transitionDelay: isRevealed ? `${(i + 5) * 100}ms` : '0ms' }"
          >
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center shrink-0', darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600']">
              <component :is="feat.icon" class="w-5 h-5" />
            </div>
            <div>
              <h4 :class="['font-semibold mb-1', darkMode ? 'text-white' : 'text-slate-900']">{{ feat.title }}</h4>
              <p :class="['text-sm', darkMode ? 'text-slate-400' : 'text-slate-500']">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
