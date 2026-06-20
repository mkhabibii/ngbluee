<template>
  <div class="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6 font-manrope">
    <!-- Background Glow -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 blur-[120px] rounded-full"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Logo/Title -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black text-white tracking-tighter mb-2">ADMIN PORTAL</h1>
      </div>

      <!-- Login Card -->
      <div class="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
            <input 
              v-model="email"
              type="email" 
              required
              class="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-600"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
            <input 
              v-model="password"
              type="password" 
              required
              class="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-600"
              placeholder="••••••••"
            />
          </div>

          <div v-if="errorMsg" class="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl">
            {{ errorMsg }}
          </div>

          <button 
            :disabled="loading"
            type="submit"
            class="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span v-if="loading">AUTHENTICATING...</span>
            <span v-else class="flex items-center justify-center gap-2">
              SIGN IN 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </button>
        </form>
      </div>

      <!-- Back to Site -->
      <div class="text-center mt-8">
        <router-link to="/" class="text-gray-500 hover:text-white text-sm transition-colors flex items-center justify-center gap-2">
          Back to Portfolio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = error.message
    loading.value = false
  } else {
    router.push('/admin')
  }
}
</script>
