<template>
  <div class="space-y-6 text-white">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Image Upload -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Image</label>
        <div 
          @click="$refs.fileInput.click()"
          class="w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 bg-white/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group"
        >
          <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
          <div v-else class="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-gray-500 group-hover:text-purple-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <p class="text-sm text-gray-500">Click to upload project cover</p>
          </div>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Title</label>
        <input v-model="form.title" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="Cool Project Name" />
      </div>

      <!-- Category -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
        <select v-model="form.category" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50">
          <option value="Web">Web</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      <!-- Tech Stack -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tech Stack (Separate with comma)</label>
        <input v-model="techInput" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="Vue, Tailwind, GSAP" />
      </div>

      <!-- Description -->
      <div class="md:col-span-2">
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
        <textarea v-model="form.description" rows="3" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="Tell about this project..."></textarea>
      </div>

      <!-- Links -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Github URL</label>
        <input v-model="form.github_url" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="https://github.com/..." />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Demo URL</label>
        <input v-model="form.demo_url" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="https://demo.com" />
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-8">
      <button @click="$emit('cancel')" class="px-6 py-3 rounded-full text-gray-400 hover:text-white transition-colors">Cancel</button>
      <button 
        @click="handleSubmit" 
        :disabled="loading"
        class="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-full font-bold transition-all disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Save Project' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { supabase } from '../../lib/supabase'

const props = defineProps(['initialData'])
const emit = defineEmits(['cancel', 'saved'])

const loading = ref(false)
const techInput = ref(props.initialData?.tech?.join(', ') || '')
const imagePreview = ref(props.initialData?.image_url || null)
const imageFile = ref(null)

const form = reactive({
  title: props.initialData?.title || '',
  category: props.initialData?.category || 'Web',
  description: props.initialData?.description || '',
  github_url: props.initialData?.github_url || '',
  demo_url: props.initialData?.demo_url || '',
  image_url: props.initialData?.image_url || ''
})

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    let image_url = form.image_url

    // 1. Upload Image if new file selected
    if (imageFile.value) {
      const fileExt = imageFile.value.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `projects/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portofolio')
        .upload(filePath, imageFile.value)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('portofolio').getPublicUrl(filePath)
      image_url = urlData.publicUrl
    }

    // 2. Prepare Data
    const projectData = {
      ...form,
      image_url,
      tech: techInput.value.split(',').map(t => t.trim()).filter(t => t)
    }

    // 3. Save to Database
    let error
    if (props.initialData?.id) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', props.initialData.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert([projectData])
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
