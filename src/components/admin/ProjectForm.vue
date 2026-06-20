<template>
  <div class="space-y-12 text-white pb-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <div class="lg:col-span-5 space-y-8">
        <!-- 1. Cover Utama -->
        <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-6 space-y-4">
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1">Project Cover</label>
          <div 
            @click="$refs.fileInput.click()"
            class="w-full aspect-video rounded-2xl border border-dashed border-white/10 hover:border-purple-500/50 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group relative"
          >
            <div v-if="imagePreview" class="w-full h-full relative">
              <img :src="imagePreview" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p class="text-xs font-bold uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full border border-white/10">Change Cover</p>
              </div>
            </div>
            <div v-else class="text-center p-6 space-y-3">
              <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <p class="text-xs font-medium text-gray-400">Click to upload cover image</p>
              <p class="text-[10px] text-gray-600">Recommended 16:9 ratio</p>
            </div>
            <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
          </div>
        </div>

        <!-- 2. Meta Info -->
        <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-6 space-y-6">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Category</label>
            <div class="relative">
              <select v-model="form.category" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 appearance-none transition-all cursor-pointer">
                <option value="Web" class="bg-[#121212] text-white">Web Application</option>
                <option value="UI/UX" class="bg-[#121212] text-white">UI/UX Design</option>
                <option value="Mobile" class="bg-[#121212] text-white">Mobile Application</option>
              </select>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Year</label>
            <input v-model="form.year" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="e.g. 2025" />
          </div>

          <div class="pt-2">
            <label class="flex items-center gap-3 cursor-pointer select-none group">
              <div class="relative flex items-center">
                <input v-model="form.is_favorite" type="checkbox" class="sr-only peer" />
                <div class="w-10 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </div>
              <span class="text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">Showcase Utama</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Right Column: Content Details -->
      <div class="lg:col-span-7 space-y-6">
        <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-8 space-y-6">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Judul Project</label>
            <input v-model="form.title" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all font-semibold" placeholder="e.g. Habibi Store" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Tagline (Singkat & Menarik)</label>
            <input v-model="form.tagline" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="e.g. Modern e-commerce for digital books" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Peran Anda (Role)</label>
            <input v-model="form.role" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="e.g. Full-Stack Developer" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Deskripsi Lengkap</label>
            <textarea v-model="form.description" rows="5" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all resize-y" placeholder="Jelaskan detail project di sini..."></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Tech Stack & Features Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
      <!-- 4. Fitur-Fitur (Dynamic List) -->
      <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-6 space-y-4">
        <div class="flex items-center justify-between ml-1 mb-2">
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80">Fitur Utama</label>
          <button @click="addFeature" type="button" class="text-[10px] font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer">
            + Tambah Fitur
          </button>
        </div>
        
        <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          <div v-for="(feat, index) in form.features" :key="index" class="flex gap-2 items-center group">
            <input v-model="form.features[index]" type="text" class="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="Contoh: Real-time Shopping Cart" />
            <button @click="removeFeature(index)" type="button" class="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer opacity-40 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div v-if="form.features.length === 0" class="text-xs text-gray-500 italic py-4 text-center">Belum ada fitur ditambahkan.</div>
        </div>
      </div>

      <!-- Tech Stack (Dynamic List) -->
      <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-6 space-y-4">
        <div class="flex items-center justify-between ml-1 mb-2">
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80">Tech Stack (Teknologi)</label>
          <button @click="addTech" type="button" class="text-[10px] font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer">
            + Tambah Teknologi
          </button>
        </div>
        
        <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          <div v-for="(t, index) in form.tech" :key="index" class="flex gap-2 items-center group">
            <input v-model="form.tech[index]" type="text" class="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="Contoh: Vue 3" />
            <button @click="removeTech(index)" type="button" class="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer opacity-40 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div v-if="form.tech.length === 0" class="text-xs text-gray-500 italic py-4 text-center">Belum ada teknologi ditambahkan.</div>
        </div>
      </div>
    </div>

    <!-- Screenshots Section -->
    <div class="border-t border-white/10 pt-8 mt-4 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-purple-400/80">Gallery / Screenshot Fitur</h3>
          <p class="text-xs text-gray-500 mt-1">Upload visualisasi atau demo halaman project Anda.</p>
        </div>
        <button 
          @click="addScreenshot" 
          type="button"
          class="px-4 py-2 border border-purple-500/30 hover:border-purple-500 bg-purple-500/5 hover:bg-purple-500/10 rounded-xl text-xs font-bold text-purple-400 hover:text-purple-300 transition-all cursor-pointer"
        >
          + Tambah Screenshot
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(shot, index) in screenshotsList" :key="index" class="bg-white/[0.01] border border-white/10 p-5 rounded-3xl relative group hover:border-white/20 transition-all">
          <button @click="removeScreenshot(index)" type="button" class="absolute right-4 top-4 z-10 p-2 bg-black/60 hover:bg-red-600 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-1">
              <div 
                @click="triggerScreenshotInput(index)"
                class="w-full aspect-video sm:aspect-square bg-black/40 rounded-2xl border border-white/10 hover:border-purple-500/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group/thumb relative transition-all"
              >
                <img v-if="shot.preview || shot.image_url" :src="shot.preview || shot.image_url" class="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform" />
                <div v-else class="text-center p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-1 text-gray-500 group-hover/thumb:text-purple-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <p class="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Upload Image</p>
                </div>
                <input type="file" :ref="el => screenInputs[index] = el" class="hidden" @change="e => handleScreenshotFile(e, index)" accept="image/*" />
              </div>
            </div>
            
            <div class="sm:col-span-2 space-y-3">
              <input v-model="shot.title" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500/50 transition-all font-semibold" placeholder="Nama Fitur (Katalog, Checkout, dll)" />
              <textarea v-model="shot.desc" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500/50 transition-all resize-none" placeholder="Penjelasan singkat fitur ini..." rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="screenshotsList.length === 0" class="text-center py-10 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-gray-600 mb-3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        <p class="text-sm text-gray-500 font-semibold mb-1">Belum ada screenshot</p>
        <p class="text-xs text-gray-600 mb-4">Tambahkan gambar pendukung untuk memperjelas project Anda.</p>
        <button 
          @click="addScreenshot"
          type="button"
          class="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          + Upload Screenshot Pertama
        </button>
      </div>
    </div>

    <!-- External Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
      <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-6 space-y-4">
        <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1">Github URL</label>
        <div class="relative">
          <input v-model="form.github_url" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-purple-500/50 transition-all text-sm" placeholder="https://github.com/username/project" />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white/[0.01] border border-white/10 rounded-3xl p-6 space-y-4">
        <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1">Live Demo URL</label>
        <div class="relative">
          <input v-model="form.demo_url" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-purple-500/50 transition-all text-sm" placeholder="https://yourdemo.com" />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Save & Cancel Buttons -->
    <div class="flex justify-end gap-4 pt-10 border-t border-white/10">
      <button 
        @click="$emit('cancel')" 
        type="button"
        class="px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300 hover:text-white font-bold transition-all cursor-pointer active:scale-95"
      >
        Batal
      </button>
      <button 
        @click="handleSubmit" 
        :disabled="loading"
        type="button"
        class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-12 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg hover:shadow-purple-500/20 cursor-pointer active:scale-95"
      >
        {{ loading ? 'Sedang Menyimpan...' : 'Simpan Project' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUpdate } from 'vue'
import { supabase } from '../../lib/supabase'

const props = defineProps(['initialData'])
const emit = defineEmits(['cancel', 'saved'])

const loading = ref(false)
const imagePreview = ref(props.initialData?.image_url || null)
const imageFile = ref(null)

// Data Form Utama
const form = reactive({
  title: props.initialData?.title || '',
  category: props.initialData?.category || 'Web',
  tagline: props.initialData?.tagline || '',
  role: props.initialData?.role || 'Full-Stack Developer',
  year: props.initialData?.year || '2025',
  description: props.initialData?.description || '',
  features: props.initialData?.features || [''],
  tech: props.initialData?.tech || [''],
  is_favorite: props.initialData?.is_favorite || false,
  github_url: props.initialData?.github_url || '',
  demo_url: props.initialData?.demo_url || '',
  image_url: props.initialData?.image_url || ''
})

// Data Screenshots
const screenshotsList = ref(props.initialData?.screenshots || [])
const screenInputs = ref([])

onBeforeUpdate(() => {
  screenInputs.value = []
})

const addFeature = () => form.features.push('')
const removeFeature = (index) => form.features.splice(index, 1)

const addTech = () => form.tech.push('')
const removeTech = (index) => form.tech.splice(index, 1)

const addScreenshot = () => {
  screenshotsList.value.push({ title: '', desc: '', image_url: '', file: null, preview: null })
}
const removeScreenshot = (index) => screenshotsList.value.splice(index, 1)

const triggerScreenshotInput = (index) => {
  screenInputs.value[index].click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleScreenshotFile = (e, index) => {
  const file = e.target.files[0]
  if (file) {
    screenshotsList.value[index].file = file
    screenshotsList.value[index].preview = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    let final_image_url = form.image_url

    // 1. Upload Cover Utama
    if (imageFile.value) {
      const fileName = `${Date.now()}_main.webp`
      const { error } = await supabase.storage.from('portofolio').upload(`projects/${fileName}`, imageFile.value)
      if (error) throw error
      const { data: urlData } = supabase.storage.from('portofolio').getPublicUrl(`projects/${fileName}`)
      final_image_url = urlData.publicUrl
    }

    // 2. Upload Semua Screenshots
    const finalScreenshots = []
    for (const item of screenshotsList.value) {
      if (item.file) {
        const fileName = `${Date.now()}_${Math.random()}.webp`
        const { error } = await supabase.storage.from('portofolio').upload(`projects/details/${fileName}`, item.file)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('portofolio').getPublicUrl(`projects/details/${fileName}`)
        finalScreenshots.push({ 
          title: item.title, 
          desc: item.desc, 
          image_url: urlData.publicUrl 
        })
      } else if (item.image_url) {
        finalScreenshots.push({ 
          title: item.title, 
          desc: item.desc, 
          image_url: item.image_url 
        })
      }
    }

    // 3. Simpan ke Database
    const cleanFeatures = form.features.filter(f => f && f.trim() !== '')
    const cleanTech = form.tech.filter(t => t && t.trim() !== '')

    const projectData = {
      ...form,
      features: cleanFeatures,
      tech: cleanTech,
      image_url: final_image_url,
      screenshots: finalScreenshots
    }

    let error
    if (props.initialData?.id) {
      const { error: updateError } = await supabase.from('projects').update(projectData).eq('id', props.initialData.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from('projects').insert([projectData])
      error = insertError
    }

    if (error) throw error
    emit('saved')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>
