<script setup lang="ts">
import { MessageCircle, Smile, Shield } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const mockMessages = [
  { name: 'Alice', role: 'Frontend Dev', text: '剛轉職前端三個月，有人可以分享經驗嗎？', align: 'left', delay: 0 },
  { name: 'Betty', role: 'Senior Engineer', text: '我去年也是！推薦妳先從 Vue 入門，社群資源超豐富的 💪', align: 'right', delay: 200 },
  { name: 'Carol', role: 'Tech Lead', text: '歡迎！我們每週有讀書會，妳有興趣一起嗎？', align: 'left', delay: 400 },
  { name: 'Alice', role: 'Frontend Dev', text: '太棒了！馬上加入 🎉', align: 'right', delay: 600 },
]

const features = [
  { icon: MessageCircle, title: '即時聊天', desc: '多頻道討論，即時回應妳的每個疑問' },
  { icon: Smile, title: 'Emoji 支援', desc: '豐富的表情符號，讓對話更有溫度' },
  { icon: Shield, title: '安全空間', desc: '專屬女性科技人的友善討論環境' },
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
        <div :class="['absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-indigo-600' : 'bg-indigo-100']"></div>
        <div :class="['absolute -bottom-20 left-1/4 w-[350px] h-[350px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000', darkMode ? 'bg-purple-600' : 'bg-purple-100']"></div>
      </div>
    </div>
    <div class="absolute inset-0 parchment-bg pointer-events-none" />

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Mock Chat UI -->
      <div
        :class="[
          'relative rounded-2xl border shadow-2xl p-6 transform lg:rotate-1 transition-all duration-700',
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          'bg-slate-900 border-slate-700'
        ]"
      >
        <!-- Chat Header -->
        <div class="flex items-center gap-3 pb-4 border-b border-slate-700 mb-4">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span class="ml-2 text-slate-400 text-sm font-mono"># general</span>
        </div>

        <!-- Messages -->
        <div class="space-y-4">
          <div
            v-for="(msg, i) in mockMessages"
            :key="i"
            :class="[
              'flex gap-3 transition-all duration-500',
              msg.align === 'right' ? 'flex-row-reverse' : '',
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            ]"
            :style="{ transitionDelay: isRevealed ? `${msg.delay + 300}ms` : '0ms' }"
          >
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0',
              i % 3 === 0 ? 'bg-indigo-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'
            ]">
              {{ msg.name[0] }}
            </div>
            <div class="max-w-[75%]">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-white text-sm font-medium">{{ msg.name }}</span>
                <span class="text-slate-500 text-xs font-mono">{{ msg.role }}</span>
              </div>
              <div :class="[
                'rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                msg.align === 'right'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              ]">
                {{ msg.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Input mock -->
        <div class="mt-4 pt-4 border-t border-slate-700">
          <div class="bg-slate-800 rounded-xl px-4 py-3 text-slate-500 text-sm font-mono">
            輸入訊息...
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div>
        <span
          :class="[
            'font-mono text-xs tracking-widest uppercase block mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100' : 'opacity-0',
            darkMode ? 'text-indigo-400' : 'text-indigo-600'
          ]"
          style="transition-delay: 200ms"
        >
          CHAT MODULE
        </span>
        <h2
          :class="[
            'text-3xl md:text-4xl font-serif font-bold mb-6 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
          style="transition-delay: 300ms"
        >
          即時連結，不再孤軍奮戰
        </h2>
        <p
          :class="[
            'text-lg leading-relaxed mb-10 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-slate-400' : 'text-slate-600'
          ]"
          style="transition-delay: 400ms"
        >
          不管是深夜 debug 的焦慮，還是拿到 offer 的喜悅，這裡永遠有人與妳同在。
        </p>

        <div class="space-y-6">
          <div
            v-for="(feat, i) in features"
            :key="i"
            :class="[
              'flex items-start gap-4 transition-all duration-700',
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            ]"
            :style="{ transitionDelay: isRevealed ? `${(i + 5) * 100}ms` : '0ms' }"
          >
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
              darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
            ]">
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
