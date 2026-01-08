import { ref } from 'vue'
import type { Ref } from 'vue'
import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

// --- 檢查是否為 Mock 模式 ---
export const MOCK_MODE: boolean = !import.meta.env.VITE_FIREBASE_API_KEY

// --- Firebase 實例 ---
export const firebaseApp: Ref<FirebaseApp | null> = ref(null)
export const firebaseAuth: Ref<Auth | null> = ref(null)
export const firebaseDb: Ref<Firestore | null> = ref(null)

// --- App ID ---
export const appId: string = import.meta.env.VITE_APP_ID || 'default-app-id'

// --- 初始化 Firebase ---
export const initializeFirebase = async (): Promise<void> => {
  if (MOCK_MODE) {
    console.log('[Firebase] Running in Mock Mode')
    return
  }

  try {
    const { initializeApp } = await import('firebase/app')
    const { getAuth } = await import('firebase/auth')
    const { getFirestore } = await import('firebase/firestore')

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    }

    const app = initializeApp(firebaseConfig)
    firebaseApp.value = app
    firebaseAuth.value = getAuth(app)
    firebaseDb.value = getFirestore(app)

    console.log('[Firebase] Initialized successfully')
  } catch (error) {
    console.error('[Firebase] Initialization error:', error)
  }
}

// --- 取得 Firestore 集合路徑 ---
export const getCollectionPath = (collection: string): string => {
  return `artifacts/${appId}/public/data/${collection}`
}
