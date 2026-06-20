<template>
  <div class="space-y-8 text-white pb-6">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
      
      <!-- Left Column: Certificate Preview -->
      <div class="md:col-span-2 space-y-4">
        <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1">Certificate Image</label>
        <div 
          @click="$refs.fileInput.click()"
          class="w-full aspect-[4/3] rounded-2xl border border-dashed border-white/10 hover:border-purple-500/50 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group relative"
        >
          <div v-if="imagePreview" class="w-full h-full relative">
            <img :src="imagePreview" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p class="text-xs font-bold uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full border border-white/10">Change Image</p>
            </div>
          </div>
          <div v-else class="text-center p-6 space-y-3">
            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <p class="text-xs font-medium text-gray-400">Click to upload certificate</p>
            <p class="text-[10px] text-gray-600">JPG, PNG, or WEBP</p>
          </div>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
        </div>
      </div>

      <!-- Right Column: Details Info -->
      <div class="md:col-span-3 space-y-6">
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Certificate Title</label>
          <input v-model="form.title" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="e.g. Google UX Design Professional" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Organization</label>
          <input v-model="form.organization" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="e.g. Coursera / Google" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Release Date / Year</label>
          <input v-model="form.year" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="e.g. Dec 2024" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-purple-400/80 ml-1 mb-2">Credential URL / Verification Link</label>
          <input v-model="form.credential_url" type="text" class="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all" placeholder="https://coursera.org/verify/..." />
        </div>
      </div>
    </div>

    <!-- Actions Buttons -->
    <div class="flex justify-end gap-4 pt-6 border-t border-white/10">
      <button 
        @click="$emit('cancel')" 
        type="button"
        class="px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300 hover:text-white font-bold transition-all cursor-pointer active:scale-95"
      >
        Cancel
      </button>
      <button 
        @click="handleSubmit" 
        :disabled="loading"
        type="button"
        class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg hover:shadow-purple-500/20 cursor-pointer active:scale-95"
      >
        {{ loading ? 'Saving...' : 'Save Credential' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { supabase } from '../../lib/supabase'

const props = defineProps(['initialData'])
const emit = defineEmits(['cancel', 'saved'])

const loading = ref(false)
const imagePreview = ref(props.initialData?.image_url || null)
const imageFile = ref(null)

const form = reactive({
  title: props.initialData?.title || '',
  organization: props.initialData?.organization || '',
  image_url: props.initialData?.image_url || '',
  credential_url: props.initialData?.credential_url || '',
  year: props.initialData?.year || ''
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

    if (imageFile.value) {
      const fileExt = imageFile.value.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `credentials/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portofolio')
        .upload(filePath, imageFile.value)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('portofolio').getPublicUrl(filePath)
      image_url = urlData.publicUrl
    }

    const certData = { ...form, image_url }

    let error
    if (props.initialData?.id) {
      const { error: updateError } = await supabase
        .from('credentials')
        .update(certData)
        .eq('id', props.initialData.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('credentials')
        .insert([certData])
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
