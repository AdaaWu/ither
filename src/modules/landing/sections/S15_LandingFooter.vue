<script setup lang="ts">
import { Code2, Github, Twitter } from 'lucide-vue-next'

interface Props {
  darkMode: boolean
}

defineProps<Props>()

const modules = [
  { name: '即時聊天', id: 'chat' },
  { name: '技術論壇', id: 'forum' },
  { name: '導師計畫', id: 'mentorship' },
  { name: '議題書單', id: 'booklist' },
  { name: '二手物交流', id: 'marketplace' },
  { name: '成長檔案', id: 'profile' },
  { name: '社群嵌入', id: 'social' },
]
</script>

<template>
  <footer class="bg-slate-950 text-slate-400 pt-16 pb-8 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <!-- Three Column -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white">
              <Code2 class="w-6 h-6" />
            </div>
            <span class="text-xl font-bold text-white">
              IT <span class="font-serif italic text-indigo-400">Her</span>
            </span>
          </div>
          <p class="font-serif italic text-slate-500 leading-relaxed">
            科技，是新時代女性的文藝復興
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-mono text-xs tracking-widest uppercase mb-4">MODULES</h4>
          <ul class="space-y-2">
            <li v-for="mod in modules" :key="mod.id">
              <span class="text-sm hover:text-white transition-colors cursor-default">
                {{ mod.name }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Social & Newsletter -->
        <div>
          <h4 class="text-white font-mono text-xs tracking-widest uppercase mb-4">CONNECT</h4>
          <div class="flex gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center hover:border-slate-600 hover:text-white transition-colors cursor-default">
              <Github class="w-5 h-5" />
            </div>
            <div class="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center hover:border-slate-600 hover:text-white transition-colors cursor-default">
              <Twitter class="w-5 h-5" />
            </div>
          </div>

          <div>
            <label class="text-xs font-mono tracking-wide block mb-2">NEWSLETTER</label>
            <div class="flex">
              <input
                type="email"
                placeholder="your@email.com"
                class="flex-1 bg-slate-900 border border-slate-800 rounded-l-lg px-4 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500 transition-colors font-mono"
              />
              <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg text-sm font-mono transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-800 pt-8 text-center">
        <p class="font-mono text-xs text-slate-600">
          &copy; {{ new Date().getFullYear() }} IT Her. Built with
          <span class="inline-block hover:animate-bounce cursor-default transition-transform">💜</span>
          for women in tech.
        </p>
      </div>
    </div>
  </footer>
</template>
