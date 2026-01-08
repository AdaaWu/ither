import { ref } from 'vue'
import type { Ref } from 'vue'
import { MOCK_MODE, firebaseDb, appId } from '@/shared/services/firebase'
import type { UserProfile, UserProfileInput } from '@/types'

export function useProfile(userId: Ref<string | null>) {
  // --- State ---
  const userProfile: Ref<UserProfile | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)

  // --- 載入自己的 Profile ---
  const loadUserProfile = async (): Promise<void> => {
    if (!userId.value) return

    if (MOCK_MODE) {
      const saved = localStorage.getItem('ither-user-profile')
      if (saved) {
        userProfile.value = JSON.parse(saved)
      }
      return
    }

    if (!firebaseDb.value) return

    try {
      isLoading.value = true
      const { doc, getDoc } = await import('firebase/firestore')
      const profileRef = doc(firebaseDb.value, 'artifacts', appId, 'public', 'data', 'userProfiles', userId.value)
      const snapshot = await getDoc(profileRef)

      if (snapshot.exists()) {
        userProfile.value = { userId: snapshot.id, ...snapshot.data() } as UserProfile
      }
    } catch (error) {
      console.error('[Profile] Load error:', error)
    } finally {
      isLoading.value = false
    }
  }

  // --- 儲存 Profile ---
  const saveUserProfile = async (profileData: UserProfileInput): Promise<boolean> => {
    if (!userId.value) return false

    const profile: UserProfile = {
      userId: userId.value,
      nickname: profileData.nickname,
      role: profileData.role,
      title: profileData.title || '',
      bio: profileData.bio || '',
      skills: profileData.skills || [],
      createdAt: userProfile.value?.createdAt || { seconds: Date.now() / 1000 },
      updatedAt: { seconds: Date.now() / 1000 }
    }

    if (MOCK_MODE) {
      localStorage.setItem('ither-user-profile', JSON.stringify(profile))
      userProfile.value = profile
      return true
    }

    if (!firebaseDb.value) return false

    try {
      isLoading.value = true
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
      const profileRef = doc(firebaseDb.value, 'artifacts', appId, 'public', 'data', 'userProfiles', userId.value)

      await setDoc(profileRef, {
        ...profileData,
        title: profileData.title || '',
        bio: profileData.bio || '',
        skills: profileData.skills || [],
        updatedAt: serverTimestamp(),
        createdAt: userProfile.value?.createdAt || serverTimestamp()
      }, { merge: true })

      userProfile.value = profile
      return true
    } catch (error) {
      console.error('[Profile] Save error:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // --- 載入其他使用者 Profile ---
  const loadOtherUserProfile = async (targetUserId: string): Promise<UserProfile | null> => {
    if (MOCK_MODE) {
      // Mock 模式: 返回假資料
      return {
        userId: targetUserId,
        nickname: 'User',
        role: 'Guest',
        title: '',
        bio: '',
        skills: [],
        createdAt: null,
        updatedAt: null
      }
    }

    if (!firebaseDb.value) return null

    try {
      const { doc, getDoc } = await import('firebase/firestore')
      const profileRef = doc(firebaseDb.value, 'artifacts', appId, 'public', 'data', 'userProfiles', targetUserId)
      const snapshot = await getDoc(profileRef)

      if (snapshot.exists()) {
        return { userId: snapshot.id, ...snapshot.data() } as UserProfile
      }
      return null
    } catch (error) {
      console.error('[Profile] Load other error:', error)
      return null
    }
  }

  return {
    userProfile,
    isLoading,
    loadUserProfile,
    saveUserProfile,
    loadOtherUserProfile
  }
}
