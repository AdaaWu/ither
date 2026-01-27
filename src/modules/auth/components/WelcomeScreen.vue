<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Users, 
  BookOpen, 
  ArrowRight,
  Code2,
  X 
} from 'lucide-vue-next'
import SkillTagInput from '@/shared/components/SkillTagInput.vue'
import type { UserProfileInput } from '@/types'
import { ROLE_OPTIONS } from '@/types'

interface Props {
  darkMode: boolean
  mockMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  join: [profile: UserProfileInput]
}>()

// --- Form State ---
const nickname: Ref<string> = ref('')
const role: Ref<string> = ref('Guest')
const title: Ref<string> = ref('')
const bio: Ref<string> = ref('')
const skills: Ref<string[]> = ref([])
const isSubmitting: Ref<boolean> = ref(false)
const showOptional: Ref<boolean> = ref(false)
const showJoinModal: Ref<boolean> = ref(false)

const handleSubmit = (): void => {
  if (!nickname.value.trim()) return
  isSubmitting.value = true
  // Simulate delay for effect
  setTimeout(() => {
    emit('join', {
      nickname: nickname.value.trim(),
      role: role.value,
      title: title.value.trim(),
      bio: bio.value.trim(),
      skills: skills.value
    })
    isSubmitting.value = false
  }, 800)
}

const bioMaxLength = 200

// --- UI State ---
const features = [
  {
    icon: Users,
    title: '導師計畫 (Mentorship)',
    desc: '尋找能夠引領妳職涯方向的導師，或是成為他人的燈塔。'
  },
  {
    icon: Sparkles,
    title: '技術論壇 (Forum)',
    desc: '安全、友善的技術討論空間，盡情發問與分享技術心得。'
  },
  {
    icon: BookOpen,
    title: '資源共享 (Resources)',
    desc: '精選的學習資源、二手書交流與職涯機會分享。'
  }
]
</script>

<template>
  <div :class="[
    'min-h-screen relative overflow-hidden transition-colors duration-500 font-sans',
    darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
  ]">
    
    <!-- Background Blobs Animation -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-if="darkMode">
        <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div v-else>
        <div class="absolute top-0 -left-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div class="absolute top-0 -right-4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
      
      <!-- Navbar -->
      <nav class="flex items-center justify-between py-6">
        <div class="flex items-center gap-2">
          <div class="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
            <Code2 class="w-6 h-6" />
          </div>
          <span class="text-xl font-bold tracking-tight">
            IT <span class="text-indigo-600">Her</span>
          </span>
        </div>
        <button 
          @click="showJoinModal = true"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95',
            darkMode 
              ? 'bg-white text-slate-900 hover:bg-slate-100' 
              : 'bg-slate-900 text-white hover:bg-slate-800'
          ]"
        >
          加入我們
        </button>
      </nav>

      <!-- Hero Section -->
      <main class="flex-1 flex flex-col justify-center items-center text-center mt-10 sm:mt-0 mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 animate-fade-in"
             :class="darkMode ? 'bg-white/5 border-white/10 text-indigo-300' : 'bg-white/50 border-indigo-100 text-indigo-600'">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span class="text-xs font-semibold tracking-wide uppercase">專屬女性科技人的社群</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pb-2">
          妳的科技職涯避風港
        </h1>
        
        <p :class="['text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed', darkMode ? 'text-slate-400' : 'text-slate-600']">
          在這裡，我們互相扶持、分享經驗。無論妳是轉職者、資深工程師或科技主管，IT Her 都是妳最溫暖的後盾。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            @click="showJoinModal = true"
            class="group px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            立即加入
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="#features"
            :class="['px-8 py-4 rounded-full border font-semibold text-lg transition flex items-center justify-center', 
              darkMode 
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800' 
                : 'border-slate-300 text-slate-600 hover:bg-slate-50'
            ]"
          >
            了解更多
          </a>
        </div>

        <!-- Mock Mode Badges -->
        <div v-if="mockMode" class="mt-8">
           <span class="text-xs font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-500">
             Demo Mode Active
           </span>
        </div>
      </main>

      <!-- Features Grid -->
      <section id="features" class="pb-24">
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, idx) in features" :key="idx" 
            :class="[
              'p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
              darkMode 
                ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/30 hover:bg-slate-800/80' 
                : 'bg-white/60 border-indigo-50 hover:border-indigo-200 hover:bg-white'
            ]"
          >
            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-6', darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600']">
              <component :is="feature.icon" class="w-6 h-6" />
            </div>
            <h3 :class="['text-xl font-bold mb-3', darkMode ? 'text-white' : 'text-slate-900']">{{ feature.title }}</h3>
            <p :class="['leading-relaxed', darkMode ? 'text-slate-400' : 'text-slate-600']">{{ feature.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer :class="['py-8 text-center text-sm border-t', darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400']">
        <p>&copy; {{ new Date().getFullYear() }} IT Her. Built for women in tech.</p>
      </footer>
    </div>

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
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showJoinModal = false"></div>

          <!-- Modal Content -->
          <div :class="[
            'relative w-full max-w-md rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto',
            darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'
          ]">
            <!-- Close Button -->
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
              <h2 :class="['text-2xl font-bold', darkMode ? 'text-white' : 'text-slate-900']">歡迎回來 IT Her</h2>
              <p :class="['mt-2', darkMode ? 'text-slate-400' : 'text-slate-500']">填寫簡單資料，開始妳的旅程</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Form Fields (Simplified for brevity, can be expanded) -->
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

              <!-- Collapsible Section -->
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

<style scoped>
/* Scoped styles can go here if generic Tailwind isn't enough */
</style>
