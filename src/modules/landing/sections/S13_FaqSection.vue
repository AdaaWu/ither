<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const activeIndex = ref<number | null>(null)

const toggle = (i: number) => {
  activeIndex.value = activeIndex.value === i ? null : i
}

const faqs = [
  { q: '這個社群只限女性嗎？', a: 'IT Her 主要服務對象是科技產業的女性工作者，但我們歡迎所有認同「科技多元包容」理念的人加入，共同營造友善的交流環境。' },
  { q: '需要付費嗎？', a: '完全免費！我們相信優質的科技社群資源應該對所有人開放。所有功能模組包含聊天室、論壇、導師計畫、書單等都可以免費使用。' },
  { q: '我是完全的初學者，適合加入嗎？', a: '非常適合！我們的社群成員涵蓋從完全零經驗的轉職者到資深工程師和技術主管。在這裡，沒有人會因為妳問了「基礎問題」而嘲笑妳。' },
  { q: '導師計畫如何運作？', a: '妳可以選擇成為導師或學員。系統會根據技能標籤和目標進行配對推薦。配對成功後，雙方可以自行安排 1:1 交流時間和頻率。' },
  { q: '如何確保社群的安全性？', a: '我們有社群守則和舉報機制。所有成員必須遵守尊重、包容、建設性的交流原則。任何騷擾或不當行為都將被立即處理。' },
  { q: '可以匿名參與嗎？', a: '可以！妳只需要提供一個暱稱即可開始使用。我們尊重每位成員的隱私選擇，不強制使用真名。' },
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
        <div :class="['absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-indigo-600' : 'bg-indigo-200']"></div>
        <div :class="['absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000', darkMode ? 'bg-purple-600' : 'bg-purple-200']"></div>
      </div>
    </div>
    <div class="absolute inset-0 grid-texture pointer-events-none" />

    <div class="relative max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-3xl md:text-5xl font-serif font-bold mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
        >
          妳可能想問
        </h2>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          :class="[
            'rounded-xl border overflow-hidden transition-all duration-500',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            activeIndex === i
              ? (darkMode ? 'border-indigo-500/30 bg-slate-900/80' : 'border-indigo-200 bg-white')
              : (darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white/60')
          ]"
          :style="{ transitionDelay: isRevealed ? `${(i + 2) * 80}ms` : '0ms' }"
        >
          <button
            @click="toggle(i)"
            class="w-full flex items-center justify-between p-5 text-left"
          >
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-1 h-6 rounded-full transition-colors duration-300',
                  activeIndex === i
                    ? 'bg-gradient-to-b from-indigo-500 to-purple-500'
                    : (darkMode ? 'bg-slate-800' : 'bg-slate-200')
                ]"
              ></div>
              <span :class="['font-semibold', darkMode ? 'text-white' : 'text-slate-900']">
                {{ faq.q }}
              </span>
            </div>
            <ChevronDown
              :class="[
                'w-5 h-5 transition-transform duration-300 shrink-0 ml-4',
                activeIndex === i ? 'rotate-180' : '',
                darkMode ? 'text-slate-500' : 'text-slate-400'
              ]"
            />
          </button>

          <div
            :class="[
              'overflow-hidden transition-all duration-300',
              activeIndex === i ? 'max-h-48' : 'max-h-0'
            ]"
          >
            <div :class="['px-5 pb-5 pl-9 text-sm leading-relaxed', darkMode ? 'text-slate-400' : 'text-slate-600']">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
