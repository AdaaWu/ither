<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Ref } from 'vue'
import MessageBubble from './MessageBubble.vue'
import type { Message } from '@/types'

interface Props {
  messages: Message[]
  currentUserId: string
  darkMode: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  clickAvatar: [userId: string]
}>()

const messagesEndRef: Ref<HTMLElement | null> = ref(null)

// 檢查是否為自己的訊息
const isMyMessage = (msg: Message): boolean => msg.userId === props.currentUserId

// 檢查是否顯示頭像
const shouldShowAvatar = (index: number): boolean => {
  return index === 0 || props.messages[index - 1].userId !== props.messages[index].userId
}

// 自動捲動到底部
watch(() => props.messages, async () => {
  await nextTick()
  messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' })
}, { deep: true })
</script>

<template>
  <div :class="['flex-1 overflow-y-auto p-4 space-y-6 transition-colors duration-300', darkMode ? 'bg-slate-950/50' : 'bg-slate-50/50']">
    <MessageBubble
      v-for="(msg, index) in messages"
      :key="msg.id"
      :message="msg"
      :is-own="isMyMessage(msg)"
      :show-avatar="shouldShowAvatar(index)"
      :dark-mode="darkMode"
      @click-avatar="emit('clickAvatar', $event)"
    />
    <div ref="messagesEndRef" />
  </div>
</template>
