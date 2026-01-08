import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { MOCK_MODE, firebaseAuth, initializeFirebase } from '@/shared/services/firebase'
import type { Unsubscribe } from 'firebase/auth'

export interface AuthUser {
  uid: string
}

export function useAuth() {
  // --- State ---
  const user: Ref<AuthUser | null> = ref(MOCK_MODE ? { uid: 'mock-user-me' } : null)
  const isInitialized: Ref<boolean> = ref(false)

  // --- 訂閱清理 ---
  let authUnsubscribe: Unsubscribe | null = null

  // --- 初始化 ---
  const initialize = async (): Promise<void> => {
    if (MOCK_MODE) {
      isInitialized.value = true
      return
    }

    await initializeFirebase()

    if (!firebaseAuth.value) {
      console.error('[Auth] Firebase Auth not initialized')
      isInitialized.value = true
      return
    }

    try {
      const { signInAnonymously, onAuthStateChanged } = await import('firebase/auth')

      await signInAnonymously(firebaseAuth.value)

      authUnsubscribe = onAuthStateChanged(firebaseAuth.value, (firebaseUser) => {
        user.value = firebaseUser ? { uid: firebaseUser.uid } : null
        isInitialized.value = true
      })
    } catch (error) {
      console.error('[Auth] Error:', error)
      isInitialized.value = true
    }
  }

  // --- 清理 ---
  const cleanup = (): void => {
    authUnsubscribe?.()
    authUnsubscribe = null
  }

  // --- 生命週期 ---
  onMounted(() => {
    initialize()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    user,
    isInitialized,
    initialize,
    cleanup
  }
}
