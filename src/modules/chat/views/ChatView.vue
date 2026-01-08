<script setup lang="ts">
import { Hash, Sun, Moon, Menu } from 'lucide-vue-next'
import MessageList from '../components/MessageList.vue'
import MessageInput from '../components/MessageInput.vue'
import type { Message, Channel } from '@/types'

interface Props {
  messages: Message[]
  currentUserId: string
  activeChannel: Channel | undefined
  darkMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  send: [text: string]
  clickAvatar: [userId: string]
  toggleDarkMode: []
  openSidebar: []
}>()
</script>

<template>
  <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
    <!-- Header -->
    <header :class="['h-16 border-b flex items-center px-4 justify-between flex-shrink-0 z-10 shadow-sm', darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200']">
      <div class="flex items-center gap-3">
        <button @click="emit('openSidebar')" class="md:hidden p-2 text-slate-500">
          <Menu class="w-6 h-6" />
        </button>
        <div class="flex items-center gap-2">
          <Hash class="w-5 h-5 text-slate-400" />
          <h2 class="font-bold text-lg">{{ activeChannel?.name || '載入中...' }}</h2>
        </div>
      </div>

      <!-- Dark Mode 切換 -->
      <button
        @click="emit('toggleDarkMode')"
        :class="['p-2 rounded-full transition-all', darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']"
        :title="darkMode ? '切換至淺色模式' : '切換至深色模式'"
      >
        <Sun v-if="darkMode" class="w-5 h-5" />
        <Moon v-else class="w-5 h-5" />
      </button>
    </header>

    <!-- 訊息列表 -->
    <MessageList
      :messages="messages"
      :current-user-id="currentUserId"
      :dark-mode="darkMode"
      @click-avatar="emit('clickAvatar', $event)"
    />

    <!-- 輸入區 -->
    <MessageInput
      :channel-name="activeChannel?.name || ''"
      :dark-mode="darkMode"
      @send="emit('send', $event)"
    />
  </div>
</template>
