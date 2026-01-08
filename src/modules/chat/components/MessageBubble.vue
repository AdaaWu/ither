<script setup lang="ts">
import type { Message } from '@/types'

interface Props {
  message: Message
  isOwn: boolean
  showAvatar: boolean
  darkMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  clickAvatar: [userId: string]
}>()

// 格式化時間
const formatTime = (timestamp: Message['timestamp']): string => {
  if (!timestamp) return '傳送中...'
  const ms = timestamp.toMillis ? timestamp.toMillis() : timestamp.seconds * 1000
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div :class="['flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300', isOwn ? 'flex-row-reverse' : '']">
    <!-- 頭像 (非自己的訊息) -->
    <div v-if="!isOwn" :class="['flex-shrink-0 w-10 h-10', !showAvatar ? 'invisible' : '']">
      <button
        @click="emit('clickAvatar', message.userId)"
        class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm bg-slate-400 hover:ring-2 hover:ring-indigo-400 transition-all"
      >
        {{ message.userName ? message.userName[0].toUpperCase() : '?' }}
      </button>
    </div>

    <div :class="['flex flex-col max-w-[80%]', isOwn ? 'items-end' : 'items-start']">
      <!-- 名稱與時間 -->
      <div v-if="showAvatar" :class="['flex items-baseline gap-2 mb-1', isOwn ? 'flex-row-reverse' : '']">
        <template v-if="!isOwn">
          <button
            @click="emit('clickAvatar', message.userId)"
            :class="['text-sm font-semibold hover:underline', darkMode ? 'text-slate-200' : 'text-slate-700']"
          >
            {{ message.userName }}
          </button>
          <span :class="['text-[10px] px-1.5 py-0.5 rounded', darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600']">
            {{ message.userRole }}
          </span>
        </template>
        <span class="text-[10px] text-slate-500 ml-1">{{ formatTime(message.timestamp) }}</span>
      </div>

      <!-- 訊息氣泡 -->
      <div :class="[
        'px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-colors',
        isOwn
          ? 'bg-indigo-600 text-white rounded-tr-sm'
          : (darkMode ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm')
      ]">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation-duration: 300ms;
  animation-fill-mode: both;
}

.fade-in {
  animation-name: fade-in;
}

.slide-in-from-bottom-2 {
  animation-name: slide-in-from-bottom-2;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-bottom-2 {
  from { transform: translateY(0.5rem); }
  to { transform: translateY(0); }
}
</style>
