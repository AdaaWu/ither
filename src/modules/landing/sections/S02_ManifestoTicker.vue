<script setup lang="ts">
interface Props {
  darkMode: boolean
}

defineProps<Props>()

const manifestos = [
  '程式碼沒有性別',
  '妳的經歷就是最好的教材',
  '科技需要不同的視角',
  '從 Junior 到 CTO，這條路不孤單',
  '勇敢發問，溫柔回答',
  '每一行 Code 都是妳的力量',
  '一起定義科技的溫度',
  '妳不需要變成別人，只需要成為更好的自己',
]
</script>

<template>
  <section
    id="manifesto-ticker"
    :class="[
      'relative overflow-hidden py-5 border-y',
      darkMode
        ? 'bg-indigo-950/80 border-indigo-900/50'
        : 'bg-indigo-600 border-indigo-700'
    ]"
  >
    <div class="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
      <span
        v-for="(text, i) in [...manifestos, ...manifestos]"
        :key="i"
        :class="[
          'inline-flex items-center gap-4 mx-6 text-base md:text-lg font-serif italic tracking-wide',
          darkMode ? 'text-indigo-200' : 'text-white/90'
        ]"
      >
        <span :class="['text-xs', darkMode ? 'text-lime-400' : 'text-indigo-200']">&#10022;</span>
        {{ text }}
      </span>
    </div>
  </section>
</template>
