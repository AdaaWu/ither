import { ref, watch, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Component } from 'vue'
import { Code, Briefcase, Heart, Coffee } from 'lucide-vue-next'
import { MOCK_MODE, firebaseDb, appId } from '@/shared/services/firebase'
import type { Message, Channel, UserProfile } from '@/types'
import type { Unsubscribe } from 'firebase/firestore'

// --- 預設留言 ---
const MOCK_MESSAGES: Message[] = [
  { id: 'm1', channelId: 'tech', text: '最近在研究 Next.js 14 的 Server Actions，大家覺得好用嗎？', userName: 'Sophia', userRole: 'Frontend Dev', userId: 'mock-1', timestamp: { seconds: Date.now()/1000 - 3600 } },
  { id: 'm2', channelId: 'tech', text: '我覺得搭配 TypeScript 開發起來快很多，但學習曲線真的有一點。', userName: '科技小白', userRole: 'Fullstack', userId: 'mock-2', timestamp: { seconds: Date.now()/1000 - 3500 } },
  { id: 'm3', channelId: 'tech', text: '有人試過 Bun 嗎？聽說比 Node.js 快很多！', userName: 'Alice', userRole: 'Backend Dev', userId: 'mock-7', timestamp: { seconds: Date.now()/1000 - 3400 } },
  { id: 'm4', channelId: 'career', text: '大家在跟 HR 談薪水的時候，會參考哪些薪資網站？', userName: '職場小菜鳥', userRole: 'QA Engineer', userId: 'mock-3', timestamp: { seconds: Date.now()/1000 - 7200 } },
  { id: 'm5', channelId: 'career', text: '我個人會參考 Levels.fyi，雖然主要偏向外企，但趨勢蠻準的。', userName: 'Emily', userRole: 'Engineering Manager', userId: 'mock-4', timestamp: { seconds: Date.now()/1000 - 7100 } },
  { id: 'm6', channelId: 'career', text: '面試前記得做功課，了解公司的技術棧和文化很重要！', userName: '資深前輩', userRole: 'Tech Lead', userId: 'mock-8', timestamp: { seconds: Date.now()/1000 - 7000 } },
  { id: 'm7', channelId: 'life', text: '今天小孩感冒，臨時要請假處理，還好主管也是媽媽，很能體諒。', userName: '忙碌的媽咪', userRole: 'Backend Dev', userId: 'mock-5', timestamp: { seconds: Date.now()/1000 - 5000 } },
  { id: 'm8', channelId: 'life', text: '真的，WLB 在選公司時真的比薪水還重要啊... (握手)', userName: '過來人', userRole: 'Product Manager', userId: 'mock-6', timestamp: { seconds: Date.now()/1000 - 4800 } },
  { id: 'm9', channelId: 'lobby', text: '有人要一起揪團購嗎？看到一個很棒的機械鍵盤團！', userName: '鍵盤控', userRole: 'Frontend Dev', userId: 'mock-9', timestamp: { seconds: Date.now()/1000 - 2000 } },
  { id: 'm10', channelId: 'lobby', text: '推薦大家一個好喝的咖啡店，在信義區，很適合遠端工作～', userName: '咖啡愛好者', userRole: 'UI/UX Designer', userId: 'mock-10', timestamp: { seconds: Date.now()/1000 - 1800 } },
]

// --- 頻道定義 ---
export const CHANNELS: Channel[] = [
  { id: 'tech', name: '技術研討', icon: Code, desc: '前端、後端、AI 與新技術分享' },
  { id: 'career', name: '職涯攻略', icon: Briefcase, desc: '面試、薪資談判、升遷與轉職' },
  { id: 'life', name: '家庭與生活', icon: Heart, desc: '育兒、Work-Life Balance、情感支持' },
  { id: 'lobby', name: '閒聊休息區', icon: Coffee, desc: '輕鬆閒聊、團購、好物分享' },
]

export function useChat(
  userId: Ref<string | null>,
  userProfile: Ref<UserProfile | null>
) {
  // --- State ---
  const messages: Ref<Message[]> = ref([])
  const currentChannel: Ref<string> = ref('tech')
  const localMessages: Ref<Message[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)

  // --- Unsubscribe ---
  let messagesUnsubscribe: Unsubscribe | null = null

  // --- Computed ---
  const activeChannel: ComputedRef<Channel | undefined> = computed(() =>
    CHANNELS.find(c => c.id === currentChannel.value)
  )

  // --- 載入訊息 ---
  const loadMessages = async (): Promise<void> => {
    if (!userId.value) return

    // Mock 模式
    if (MOCK_MODE) {
      const allMessages: Message[] = [...MOCK_MESSAGES, ...localMessages.value]
      messages.value = allMessages
        .filter(m => m.channelId === currentChannel.value)
        .sort((a, b) => {
          const t1 = (a.timestamp?.seconds ?? 0) * 1000 || Date.now()
          const t2 = (b.timestamp?.seconds ?? 0) * 1000 || Date.now()
          return t1 - t2
        })
      return
    }

    // Firebase 模式
    if (!firebaseDb.value) return

    try {
      const { collection, onSnapshot } = await import('firebase/firestore')

      const q = collection(firebaseDb.value, 'artifacts', appId, 'public', 'data', 'messages')

      messagesUnsubscribe?.()
      messagesUnsubscribe = onSnapshot(q, (snapshot) => {
        const realMessages: Message[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Message))

        const allMessages: Message[] = [...MOCK_MESSAGES, ...realMessages]
        messages.value = allMessages
          .filter(m => m.channelId === currentChannel.value)
          .sort((a, b) => {
            const t1 = a.timestamp ? (a.timestamp.toMillis ? a.timestamp.toMillis() : a.timestamp.seconds * 1000) : Date.now()
            const t2 = b.timestamp ? (b.timestamp.toMillis ? b.timestamp.toMillis() : b.timestamp.seconds * 1000) : Date.now()
            return t1 - t2
          })
      }, (error) => console.error('[Chat] Error:', error))
    } catch (error) {
      console.error('[Chat] Load error:', error)
    }
  }

  // --- 發送訊息 ---
  const sendMessage = async (text: string): Promise<boolean> => {
    if (!text.trim() || !userId.value || !userProfile.value) return false

    // Mock 模式
    if (MOCK_MODE) {
      const newMsg: Message = {
        id: `local-${Date.now()}`,
        text,
        channelId: currentChannel.value,
        userId: userId.value,
        userName: userProfile.value.nickname,
        userRole: userProfile.value.role,
        timestamp: { seconds: Date.now() / 1000 },
        type: 'text'
      }
      localMessages.value = [...localMessages.value, newMsg]
      // 重新載入以觸發排序
      loadMessages()
      return true
    }

    // Firebase 模式
    if (!firebaseDb.value) return false

    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')

      await addDoc(collection(firebaseDb.value, 'artifacts', appId, 'public', 'data', 'messages'), {
        text,
        channelId: currentChannel.value,
        userId: userId.value,
        userName: userProfile.value.nickname,
        userRole: userProfile.value.role,
        timestamp: serverTimestamp(),
        type: 'text'
      })
      return true
    } catch (error) {
      console.error('[Chat] Send error:', error)
      return false
    }
  }

  // --- 切換頻道 ---
  const selectChannel = (channelId: string): void => {
    currentChannel.value = channelId
  }

  // --- 清理 ---
  const cleanup = (): void => {
    messagesUnsubscribe?.()
    messagesUnsubscribe = null
  }

  // --- Watch 頻道變化 ---
  watch([userId, currentChannel, localMessages], () => {
    loadMessages()
  }, { immediate: true, deep: true })

  return {
    messages,
    currentChannel,
    activeChannel,
    channels: CHANNELS,
    isLoading,
    loadMessages,
    sendMessage,
    selectChannel,
    cleanup
  }
}
