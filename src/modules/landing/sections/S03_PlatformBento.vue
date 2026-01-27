<script setup lang="ts">
import {
  MessageCircle, MessagesSquare, Users, BookOpen,
  ShoppingBag, UserCircle, Share2
} from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const modules = [
  {
    icon: MessageCircle,
    name: 'Chat',
    label: '即時聊天',
    desc: '多頻道即時討論，隨時找到妳的夥伴',
    accent: 'indigo',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    icon: MessagesSquare,
    name: 'Forum',
    label: '技術論壇',
    desc: '五大分類，安全友善的技術討論空間',
    accent: 'purple',
    span: 'md:col-span-2',
  },
  {
    icon: Users,
    name: 'Mentorship',
    label: '導師計畫',
    desc: '一對一配對，找到妳的職涯燈塔',
    accent: 'pink',
    span: 'md:row-span-2',
  },
  {
    icon: BookOpen,
    name: 'Booklist',
    label: '議題書單',
    desc: '精選書單與書評分享',
    accent: 'amber',
    span: '',
  },
  {
    icon: ShoppingBag,
    name: 'Marketplace',
    label: '二手物交流',
    desc: '閒置好物找到新主人',
    accent: 'teal',
    span: '',
  },
  {
    icon: UserCircle,
    name: 'Profile',
    label: '成長檔案',
    desc: '記錄妳的目標與成就',
    accent: 'blue',
    span: '',
  },
  {
    icon: Share2,
    name: 'Social',
    label: '社群嵌入',
    desc: '整合外部社群貼文',
    accent: 'rose',
    span: '',
  },
]

const accentColors: Record<string, { bg: string; bgDark: string; text: string; textDark: string; border: string; borderDark: string }> = {
  indigo: { bg: 'bg-indigo-50', bgDark: 'bg-indigo-500/10', text: 'text-indigo-600', textDark: 'text-indigo-400', border: 'border-indigo-200', borderDark: 'border-indigo-500/30' },
  purple: { bg: 'bg-purple-50', bgDark: 'bg-purple-500/10', text: 'text-purple-600', textDark: 'text-purple-400', border: 'border-purple-200', borderDark: 'border-purple-500/30' },
  pink: { bg: 'bg-pink-50', bgDark: 'bg-pink-500/10', text: 'text-pink-600', textDark: 'text-pink-400', border: 'border-pink-200', borderDark: 'border-pink-500/30' },
  amber: { bg: 'bg-amber-50', bgDark: 'bg-amber-500/10', text: 'text-amber-600', textDark: 'text-amber-400', border: 'border-amber-200', borderDark: 'border-amber-500/30' },
  teal: { bg: 'bg-teal-50', bgDark: 'bg-teal-500/10', text: 'text-teal-600', textDark: 'text-teal-400', border: 'border-teal-200', borderDark: 'border-teal-500/30' },
  blue: { bg: 'bg-blue-50', bgDark: 'bg-blue-500/10', text: 'text-blue-600', textDark: 'text-blue-400', border: 'border-blue-200', borderDark: 'border-blue-500/30' },
  rose: { bg: 'bg-rose-50', bgDark: 'bg-rose-500/10', text: 'text-rose-600', textDark: 'text-rose-400', border: 'border-rose-200', borderDark: 'border-rose-500/30' },
}
</script>

<template>
  <section
    ref="containerRef"
    :class="['py-24 px-6 lg:px-12', darkMode ? 'bg-slate-950' : 'bg-parchment-50']"
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
          七大殿堂，一個社群
        </h2>
        <p
          :class="[
            'text-lg max-w-xl mx-auto transition-all duration-700 delay-200',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-slate-400' : 'text-slate-500'
          ]"
        >
          每一個模組，都是為了讓妳成長得更自在
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        <div
          v-for="(mod, i) in modules"
          :key="mod.name"
          :class="[
            mod.span,
            'group relative rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.02] cursor-default overflow-hidden',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode
              ? `bg-slate-900/60 ${accentColors[mod.accent].borderDark} hover:bg-slate-800/80`
              : `bg-white/70 ${accentColors[mod.accent].border} hover:bg-white hover:shadow-lg`
          ]"
          :style="{ transitionDelay: isRevealed ? `${(i + 2) * 100}ms` : '0ms' }"
        >
          <!-- Icon -->
          <div :class="[
            'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
            darkMode ? accentColors[mod.accent].bgDark : accentColors[mod.accent].bg
          ]">
            <component
              :is="mod.icon"
              :class="['w-5 h-5', darkMode ? accentColors[mod.accent].textDark : accentColors[mod.accent].text]"
            />
          </div>

          <!-- Module Name -->
          <span :class="['font-mono text-xs tracking-widest uppercase block mb-2', darkMode ? 'text-slate-500' : 'text-slate-400']">
            {{ mod.name }}
          </span>

          <!-- Label -->
          <h3 :class="['font-serif text-xl font-bold mb-2', darkMode ? 'text-white' : 'text-slate-900']">
            {{ mod.label }}
          </h3>

          <!-- Description -->
          <p :class="['text-sm leading-relaxed', darkMode ? 'text-slate-400' : 'text-slate-500']">
            {{ mod.desc }}
          </p>

          <!-- Hover glow -->
          <div
            :class="[
              'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none',
              darkMode
                ? 'bg-gradient-to-br from-indigo-500/5 to-transparent'
                : 'bg-gradient-to-br from-indigo-50/50 to-transparent'
            ]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
