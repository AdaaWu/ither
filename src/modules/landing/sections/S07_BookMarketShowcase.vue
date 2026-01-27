<script setup lang="ts">
import { BookOpen, ShoppingBag, Star } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const { containerRef, isRevealed } = useScrollReveal()

const books = [
  { title: '重構：改善既有程式的設計', author: 'Martin Fowler', rating: 4.8, reviews: 24, color: 'bg-amber-500' },
  { title: 'Clean Code', author: 'Robert C. Martin', rating: 4.6, reviews: 31, color: 'bg-orange-500' },
  { title: '設計模式的解析與活用', author: 'Alan Shalloway', rating: 4.3, reviews: 15, color: 'bg-yellow-600' },
]

const items = [
  { title: 'MacBook Pro 2023 保護殼', price: 'NT$ 450', condition: '九成新', color: 'bg-teal-500' },
  { title: 'JavaScript 高級程式設計 第4版', price: 'NT$ 300', condition: '全新', color: 'bg-cyan-500' },
  { title: 'HHKB Professional 鍵盤', price: 'NT$ 3,500', condition: '八成新', color: 'bg-emerald-500' },
]
</script>

<template>
  <section
    ref="containerRef"
    :class="['relative py-24 px-6 lg:px-12 overflow-hidden', darkMode ? 'bg-slate-950' : 'bg-parchment-50']"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div :class="darkMode ? 'opacity-20' : 'opacity-35'">
        <div :class="['absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl animate-blob', darkMode ? 'bg-amber-600' : 'bg-amber-200']"></div>
        <div :class="['absolute -bottom-16 right-1/4 w-[450px] h-[450px] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000', darkMode ? 'bg-teal-600' : 'bg-teal-200']"></div>
      </div>
    </div>
    <div class="absolute inset-0 grid-texture pointer-events-none" />

    <div class="relative max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-3xl md:text-5xl font-serif font-bold mb-4 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            darkMode ? 'text-white' : 'text-slate-900'
          ]"
        >
          知識與分享的交匯
        </h2>
      </div>

      <!-- Two Column -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        <!-- Booklist Side -->
        <div
          :class="[
            'lg:pr-12 lg:border-r transition-all duration-700',
            isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
            darkMode ? 'lg:border-slate-800' : 'lg:border-slate-200'
          ]"
          style="transition-delay: 200ms"
        >
          <div class="flex items-center gap-3 mb-8">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600']">
              <BookOpen class="w-5 h-5" />
            </div>
            <div>
              <span class="font-mono text-xs tracking-widest uppercase block" :class="darkMode ? 'text-amber-400' : 'text-amber-600'">BOOKLIST</span>
              <h3 :class="['font-serif text-xl font-bold', darkMode ? 'text-white' : 'text-slate-900']">議題書單</h3>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="(book, i) in books"
              :key="book.title"
              :class="[
                'flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 hover:-translate-y-0.5',
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 hover:shadow-md'
              ]"
              :style="{ transitionDelay: isRevealed ? `${(i + 3) * 100}ms` : '0ms' }"
            >
              <div :class="['w-10 h-14 rounded flex items-center justify-center text-white text-xs font-bold', book.color]">
                {{ book.title[0] }}
              </div>
              <div class="flex-1 min-w-0">
                <div :class="['font-semibold text-sm truncate', darkMode ? 'text-white' : 'text-slate-900']">{{ book.title }}</div>
                <div :class="['text-xs font-mono', darkMode ? 'text-slate-500' : 'text-slate-400']">{{ book.author }}</div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span class="font-mono text-sm" :class="darkMode ? 'text-amber-300' : 'text-amber-600'">{{ book.rating }}</span>
                <span :class="['text-xs', darkMode ? 'text-slate-600' : 'text-slate-400']">({{ book.reviews }})</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Marketplace Side -->
        <div
          :class="[
            'lg:pl-12 transition-all duration-700',
            isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
          ]"
          style="transition-delay: 400ms"
        >
          <div class="flex items-center gap-3 mb-8">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', darkMode ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-600']">
              <ShoppingBag class="w-5 h-5" />
            </div>
            <div>
              <span class="font-mono text-xs tracking-widest uppercase block" :class="darkMode ? 'text-teal-400' : 'text-teal-600'">MARKETPLACE</span>
              <h3 :class="['font-serif text-xl font-bold', darkMode ? 'text-white' : 'text-slate-900']">二手物交流</h3>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, i) in items"
              :key="item.title"
              :class="[
                'flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 hover:-translate-y-0.5',
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 hover:shadow-md'
              ]"
              :style="{ transitionDelay: isRevealed ? `${(i + 5) * 100}ms` : '0ms' }"
            >
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold', item.color]">
                {{ item.title[0] }}
              </div>
              <div class="flex-1 min-w-0">
                <div :class="['font-semibold text-sm truncate', darkMode ? 'text-white' : 'text-slate-900']">{{ item.title }}</div>
                <div :class="['text-xs', darkMode ? 'text-slate-500' : 'text-slate-400']">{{ item.condition }}</div>
              </div>
              <span :class="['font-mono text-sm font-semibold shrink-0', darkMode ? 'text-teal-400' : 'text-teal-600']">
                {{ item.price }}
              </span>
            </div>
          </div>

          <div
            :class="[
              'mt-6 text-center font-mono text-sm transition-all duration-700',
              isRevealed ? 'opacity-100' : 'opacity-0',
              darkMode ? 'text-slate-500' : 'text-slate-400'
            ]"
            style="transition-delay: 900ms"
          >
            已交易 <span :class="darkMode ? 'text-teal-400' : 'text-teal-600'">128</span> 件
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
