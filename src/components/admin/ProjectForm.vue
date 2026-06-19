<template>
  <div class="space-y-8 text-white pb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- 1. Cover Utama -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Cover</label>
        <div 
          @click="$refs.fileInput.click()"
          class="w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 bg-white/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group"
        >
          <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
          <div v-else class="text-center p-6">
            <p class="text-sm text-gray-500">Klik untuk upload cover utama</p>
          </div>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
        </div>
      </div>

      <!-- 2. Informasi Dasar -->
      <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Judul Project</label>
          <input v-model="form.title" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500/50 outline-none" placeholder="Webstore" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Kategori</label>
          <select v-model="form.category" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none">
            <option value="Web">Web</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tahun</label>
          <input v-model="form.year" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" placeholder="2025" />
        </div>
        <div class="flex flex-col justify-end pb-3">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input v-model="form.is_favorite" type="checkbox" class="w-5 h-5 accent-purple-600 rounded bg-white/5 border border-white/10 cursor-pointer" />
            <span class="text-xs font-bold uppercase tracking-wider text-gray-300">Showcase Utama</span>
          </label>
        </div>
      </div>

      <!-- 3. Detail Editorial -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tagline (Singkat & Menarik)</label>
        <input v-model="form.tagline" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" placeholder="Modern e-commerce for digital books" />
      </div>

      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Peran Anda (Role)</label>
        <input v-model="form.role" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" placeholder="Full-Stack Developer" />
      </div>

      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Deskripsi Lengkap</label>
        <textarea v-model="form.description" rows="4" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" placeholder="Jelaskan detail project di sini..."></textarea>
      </div>

      <!-- 4. Fitur-Fitur (Dynamic List) -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Fitur Utama</label>
        <div v-for="(feat, index) in form.features" :key="index" class="flex gap-2 mb-2">
          <input v-model="form.features[index]" type="text" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none" placeholder="Contoh: Real-time Shopping Cart" />
          <button @click="removeFeature(index)" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">✕</button>
        </div>
        <button @click="addFeature" class="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest">+ Tambah Fitur</button>
      </div>

      <!-- Tech Stack (Dynamic List) -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tech Stack (Teknologi)</label>
        <div v-for="(t, index) in form.tech" :key="index" class="flex gap-2 mb-2">
          <input v-model="form.tech[index]" type="text" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none" placeholder="Contoh: Vue 3" />
          <button @click="removeTech(index)" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">✕</button>
        </div>
        <button @click="addTech" class="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest">+ Tambah Teknologi</button>
      </div>

      <!-- 5. Screenshots & Detail Fitur (Multiple Images) -->
      <div class="md:col-span-2 border-t border-white/10 pt-8 mt-4">
        <h3 class="text-sm font-bold uppercase tracking-[0.2em] mb-6">Gallery / Screenshot Fitur</h3>
        <div v-for="(shot, index) in screenshotsList" :key="index" class="bg-white/5 p-4 rounded-2xl mb-4 border border-white/5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-1">
               <div 
                @click="triggerScreenshotInput(index)"
                class="w-full aspect-video bg-black/40 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group"
               >
                 <img v-if="shot.preview" :src="shot.preview" class="w-full h-full object-cover" />
                 <p v-else class="text-[10px] text-gray-500 uppercase">Upload Image</p>
                 <input type="file" :ref="el => screenInputs[index] = el" class="hidden" @change="e => handleScreenshotFile(e, index)" accept="image/*" />
               </div>
            </div>
            <div class="md:col-span-2 space-y-3">
              <input v-model="shot.title" type="text" class="w-full bg-black/20 border border-white/5 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Nama Fitur (Katalog, Checkout, dll)" />
              <textarea v-model="shot.desc" class="w-full bg-black/20 border border-white/5 rounded-lg px-3 py-2 text-xs outline-none" placeholder="Penjelasan singkat fitur ini..." rows="2"></textarea>
              <button @click="removeScreenshot(index)" class="text-xs text-red-400 hover:text-red-300">Hapus Screenshot</button>
            </div>
          </div>
        </div>
        <button @click="addScreenshot" class="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-xs font-bold text-gray-500 hover:border-purple-500/30 hover:text-gray-300 transition-all">+ TAMBAH SCREENSHOT BARU</button>
      </div>

      <!-- 6. Link Eksternal -->
      <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Github URL</label>
          <input v-model="form.github_url" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" placeholder="https://github.com/..." />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Live Demo URL</label>
          <input v-model="form.demo_url" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" placeholder="https://demo.com" />
        </div>
      </div>
    </div>

    <!-- Tombol Save -->
    <div class="flex justify-end gap-3 mt-12">
      <button @click="$emit('cancel')" class="px-8 py-3 rounded-full text-gray-400 hover:text-white transition-colors">Batal</button>
      <button 
        @click="handleSubmit" 
        :disabled="loading"
        class="bg-purple-600 hover:bg-purple-700 text-white px-12 py-3 rounded-full font-bold transition-all disabled:opacity-50 shadow-xl shadow-purple-900/20"
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
