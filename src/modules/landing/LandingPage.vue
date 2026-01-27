<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { ChevronDown, ChevronUp, Code2, X } from 'lucide-vue-next'
import SkillTagInput from '@/shared/components/SkillTagInput.vue'
import type { UserProfileInput } from '@/types'
import { ROLE_OPTIONS } from '@/types'

import S01_HeroSection from './sections/S01_HeroSection.vue'
import S02_ManifestoTicker from './sections/S02_ManifestoTicker.vue'
import S03_PlatformBento from './sections/S03_PlatformBento.vue'
import S04_ChatShowcase from './sections/S04_ChatShowcase.vue'
import S05_ForumShowcase from './sections/S05_ForumShowcase.vue'
import S06_MentorshipShowcase from './sections/S06_MentorshipShowcase.vue'
import S07_BookMarketShowcase from './sections/S07_BookMarketShowcase.vue'
import S08_ProfileShowcase from './sections/S08_ProfileShowcase.vue'
import S09_SocialProof from './sections/S09_SocialProof.vue'
import S10_JourneyTimeline from './sections/S10_JourneyTimeline.vue'
import S11_Testimonials from './sections/S11_Testimonials.vue'
import S12_TechStackRibbon from './sections/S12_TechStackRibbon.vue'
import S13_FaqSection from './sections/S13_FaqSection.vue'
import S14_FinalCta from './sections/S14_FinalCta.vue'
import S15_LandingFooter from './sections/S15_LandingFooter.vue'

interface Props {
  darkMode: boolean
  mockMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  join: [profile: UserProfileInput]
}>()

// --- Join Modal State ---
const showJoinModal: Ref<boolean> = ref(false)
const nickname: Ref<string> = ref('')
const role: Ref<string> = ref('Guest')
const title: Ref<string> = ref('')
const skills: Ref<string[]> = ref([])
const isSubmitting: Ref<boolean> = ref(false)
const showOptional: Ref<boolean> = ref(false)

const openJoinModal = () => {
  showJoinModal.value = true
}

// --- Scroll Progress ---
const scrollProgress = ref(0)
const onScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const handleSubmit = (): void => {
  if (!nickname.value.trim()) return
  isSubmitting.value = true
  setTimeout(() => {
    emit('join', {
      nickname: nickname.value.trim(),
      role: role.value,
      title: title.value.trim(),
      bio: '',
      skills: skills.value
    })
    isSubmitting.value = false
  }, 800)
}
</script>

<template>
  <div :class="[
    'min-h-screen transition-colors duration-500 noise-overlay',
    darkMode ? 'bg-slate-950 text-slate-100' : 'bg-parchment-50 text-slate-900'
  ]">
    <!-- Scroll Progress Indicator -->
    <div class="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div :class="['w-0.5 h-32 rounded-full overflow-hidden', darkMode ? 'bg-slate-800' : 'bg-slate-200/60']">
        <div
          class="w-full rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 transition-all duration-150"
          :style="{ height: `${scrollProgress}%` }"
        />
      </div>
    </div>

    <S01_HeroSection :dark-mode="darkMode" @join="openJoinModal" />
    <S02_ManifestoTicker :dark-mode="darkMode" />
    <S03_PlatformBento :dark-mode="darkMode" />
    <S04_ChatShowcase :dark-mode="darkMode" />
    <S05_ForumShowcase :dark-mode="darkMode" />
    <S06_MentorshipShowcase :dark-mode="darkMode" />
    <S07_BookMarketShowcase :dark-mode="darkMode" />
    <S08_ProfileShowcase :dark-mode="darkMode" />
    <S09_SocialProof :dark-mode="darkMode" />
    <S10_JourneyTimeline :dark-mode="darkMode" />
    <S11_Testimonials :dark-mode="darkMode" />
    <S12_TechStackRibbon :dark-mode="darkMode" />
    <S13_FaqSection :dark-mode="darkMode" />
    <S14_FinalCta :dark-mode="darkMode" @join="openJoinModal" />
    <S15_LandingFooter :dark-mode="darkMode" />

    <!-- Join Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="showJoinModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showJoinModal = false"></div>
          <div :class="[
            'relative w-full max-w-md rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto',
            darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'
          ]">
            <button
              @click="showJoinModal = false"
              :class="['absolute top-4 right-4 p-1 rounded-full transition', darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-100']"
            >
              <X class="w-5 h-5" />
            </button>

            <div class="text-center mb-8">
              <div class="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                <Code2 class="w-6 h-6 text-white" />
              </div>
              <h2 :class="['text-2xl font-serif font-bold', darkMode ? 'text-white' : 'text-slate-900']">歡迎加入 IT Her</h2>
              <p :class="['mt-2', darkMode ? 'text-slate-400' : 'text-slate-500']">填寫簡單資料，開始妳的 Renaissance</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-slate-300' : 'text-slate-700']">
                  妳的暱稱 <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="nickname"
                  type="text"
                  required
                  maxlength="20"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition',
                    darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                  ]"
                  placeholder="例如：Alice"
                />
              </div>

              <div>
                <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-slate-300' : 'text-slate-700']">
                  目前的角色 <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="role"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition appearance-none cursor-pointer',
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  ]"
                >
                  <option v-for="r in ROLE_OPTIONS" :key="r" :value="r">{{ r }}</option>
                </select>
              </div>

              <div class="border-t pt-4" :class="darkMode ? 'border-slate-800' : 'border-slate-100'">
                <button
                  type="button"
                  @click="showOptional = !showOptional"
                  :class="[
                    'w-full flex items-center justify-between text-sm font-medium transition-colors',
                    darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
                  ]"
                >
                  <span>進階資料 (選填)</span>
                  <component :is="showOptional ? ChevronUp : ChevronDown" class="w-4 h-4" />
                </button>

                <div v-show="showOptional" class="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-2">
                  <div>
                    <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-slate-300' : 'text-slate-700']">
                      職位/頭銜
                    </label>
                    <input
                      v-model="title"
                      type="text"
                      :class="[
                        'w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition',
                        darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                      ]"
                      placeholder="例如：Frontend Engineer"
                    />
                  </div>
                  <div>
                    <label :class="['block text-sm font-medium mb-2', darkMode ? 'text-slate-300' : 'text-slate-700']">
                      技能標籤
                    </label>
                    <SkillTagInput
                      v-model="skills"
                      :dark-mode="darkMode"
                      :max-tags="5"
                    />
                  </div>
                </div>
              </div>

              <button
                :disabled="isSubmitting || !nickname.trim()"
                type="submit"
                :class="[
                  'w-full font-bold py-3.5 rounded-xl transition shadow-lg shadow-indigo-500/20 active:scale-95 text-lg',
                  isSubmitting || !nickname.trim()
                    ? (darkMode ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                ]"
              >
                {{ isSubmitting ? '處理中...' : '開始探索' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
