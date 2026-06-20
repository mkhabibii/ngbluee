<template>
  <div class="min-h-screen bg-[#0d0d0d] text-white font-manrope flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/10 p-6 flex flex-col justify-between">
      <div>
        <div class="mb-10">
          <h1 class="text-xl font-black tracking-tighter">HABIBI ADMIN</h1>
        </div>
        
        <nav class="space-y-2">
          <button 
            @click="activeTab = 'projects'"
            :class="activeTab === 'projects' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'"
            class="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Projects
          </button>
          <button 
            @click="activeTab = 'credentials'"
            :class="activeTab === 'credentials' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'"
            class="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Credentials
          </button>
        </nav>
      </div>

      <button 
        @click="handleLogout"
        class="flex items-center gap-3 text-gray-500 hover:text-red-400 px-4 py-3 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        Logout
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-y-auto">
      <!-- List View -->
      <div v-if="!showForm">
        <header class="flex justify-between items-center mb-10">
          <h2 class="text-3xl font-black capitalize tracking-tight">{{ activeTab }}</h2>
          <button 
            @click="openAddForm"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95 cursor-pointer"
          >
            <span>+ Add New</span>
          </button>
        </header>

        <!-- Projects List -->
        <div v-if="activeTab === 'projects'" class="grid gap-4">
          <div v-if="loading" class="text-gray-500 italic">Loading projects...</div>
          <div v-else-if="projects.length === 0" class="text-gray-500">No projects found. Add your first one!</div>
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all duration-300"
          >
            <div class="flex items-center gap-4">
              <img :src="project.image_url" class="w-16 h-12 object-cover rounded-lg bg-gray-800" />
              <div>
                <h3 class="font-bold text-lg leading-none mb-1">{{ project.title }}</h3>
                <p class="text-xs text-gray-500 uppercase tracking-widest">{{ project.category }}</p>
              </div>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click="editItem(project)" class="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-sm transition-all cursor-pointer">Edit</button>
              <button @click="deleteItem(project.id, 'projects')" class="px-3 py-1.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm transition-all cursor-pointer">Delete</button>
            </div>
          </div>
        </div>

        <!-- Credentials List -->
        <div v-if="activeTab === 'credentials'" class="grid gap-4">
          <div v-if="loading" class="text-gray-500 italic">Loading credentials...</div>
          <div v-else-if="credentials.length === 0" class="text-gray-500">No credentials found.</div>
          <div 
            v-for="cert in credentials" 
            :key="cert.id"
            class="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all duration-300"
          >
            <div class="flex items-center gap-4">
              <img :src="cert.image_url" class="w-16 h-12 object-cover rounded-lg bg-gray-800" />
              <div>
                <h3 class="font-bold text-lg leading-none mb-1">{{ cert.title }}</h3>
                <p class="text-xs text-gray-500 uppercase tracking-widest">{{ cert.organization }}</p>
              </div>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click="editItem(cert)" class="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-sm transition-all cursor-pointer">Edit</button>
              <button @click="deleteItem(cert.id, 'credentials')" class="px-3 py-1.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm transition-all cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form View -->
      <div v-else class="max-w-5xl">
        <div class="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <button 
              @click="showForm = false"
              class="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all mb-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to List
            </button>
            <h2 class="text-3xl font-black tracking-tight uppercase">
              {{ editingItem ? 'Edit' : 'Add New' }} {{ activeTab === 'projects' ? 'Project' : 'Credential' }}
            </h2>
          </div>
        </div>

        <div class="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
          <ProjectForm 
            v-if="activeTab === 'projects'" 
            :initialData="editingItem"
            @cancel="showForm = false"
            @saved="handleSaved"
          />
          <CredentialForm 
            v-else
            :initialData="editingItem"
            @cancel="showForm = false"
            @saved="handleSaved"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import ProjectForm from '../../components/admin/ProjectForm.vue'
import CredentialForm from '../../components/admin/CredentialForm.vue'

const router = useRouter()
const activeTab = ref('projects')
const loading = ref(false)
const projects = ref([])
const credentials = ref([])
const showForm = ref(false)
const editingItem = ref(null)

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}

const fetchData = async () => {
  loading.value = true
  if (activeTab.value === 'projects') {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    projects.value = data || []
  } else {
    const { data } = await supabase.from('credentials').select('*').order('created_at', { ascending: true })
    credentials.value = data || []
  }
  loading.value = false
}

const deleteItem = async (id, table) => {
  if (confirm('Are you sure you want to delete this item?')) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) fetchData()
  }
}

const openAddForm = () => {
    editingItem.value = null
    showForm.value = true
}

const editItem = (item) => {
    editingItem.value = item
    showForm.value = true
}

const handleSaved = () => {
    showForm.value = false
    fetchData()
}

onMounted(fetchData)
watch(activeTab, () => {
  showForm.value = false
  fetchData()
})
</script>
