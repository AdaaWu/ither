<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Send, Smile } from 'lucide-vue-next'
import EmojiPicker from '@/shared/components/EmojiPicker.vue'

interface Props {
  channelName: string
  darkMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  send: [text: string]
}>()

const newMessage: Ref<string> = ref('')
const isEmojiPickerOpen: Ref<boolean> = ref(false)
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const emojiPickerRef: Ref<HTMLElement | null> = ref(null)

const handleSubmit = (): void => {
  if (!newMessage.value.trim()) return
  emit('send', newMessage.value.trim())
  newMessage.value = ''
}

const handleEmojiSelect = (emoji: string): void => {
  newMessage.value += emoji
  isEmojiPickerOpen.value = false
  inputRef.value?.focus()
}

// 點擊外部關閉
const handleClickOutside = (event: MouseEvent): void => {
  if (emojiPickerRef.value && !emojiPickerRef.value.contains(event.target as Node)) {
    isEmojiPickerOpen.value = false
  }
}

// 監聽點擊事件
if (typeof window !== 'undefined') {
  document.addEventListener('mousedown', handleClickOutside)
}
</script>

<template>
  <div :class="['p-4 border-t relative transition-colors duration-300 flex-shrink-0', darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200']">
    <!-- Emoji Picker -->
    <div ref="emojiPickerRef">
      <EmojiPicker
        v-if="isEmojiPickerOpen"
        :dark-mode="darkMode"
        @select="handleEmojiSelect"
        @close="isEmojiPickerOpen = false"
      />
    </div>

    <form @submit.prevent="handleSubmit" class="flex items-center gap-2 max-w-4xl mx-auto">
      <button
        type="button"
        @click="isEmojiPickerOpen = !isEmojiPickerOpen"
        :class="['p-2 rounded-full transition', isEmojiPickerOpen ? (darkMode ? 'bg-indigo-900/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600') : 'text-slate-400 hover:text-indigo-500']"
      >
        <Smile class="w-6 h-6" />
      </button>
      <input
        ref="inputRef"
        v-model="newMessage"
        type="text"
        :placeholder="`在 #${channelName} 發送訊息...`"
        :class="['flex-1 px-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 transition outline-none', darkMode ? 'bg-slate-800 text-white placeholder-slate-500 focus:bg-slate-700' : 'bg-slate-100 text-slate-800 focus:bg-white']"
      />
      <button
        type="submit"
        :disabled="!newMessage.trim()"
        :class="['p-3 rounded-xl transition-all shadow-sm', !newMessage.trim() ? (darkMode ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400') : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95']"
      >
        <Send class="w-5 h-5" />
      </button>
    </form>
  </div>
</template>
