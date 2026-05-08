<template>
  <div class="space-y-6 text-white">
    <!-- Image Upload -->
    <div>
      <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Certificate Image</label>
      <div 
        @click="$refs.fileInput.click()"
        class="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 bg-white/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group"
      >
        <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
        <div v-else class="text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-gray-500 group-hover:text-purple-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <p class="text-sm text-gray-500">Click to upload certificate</p>
        </div>
        <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
      </div>
    </div>

    <!-- Title -->
    <div>
      <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Certificate Title</label>
      <input v-model="form.title" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="Google UX Design..." />
    </div>

    <!-- Organization -->
    <div>
      <label class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Organization</label>
      <input v-model="form.organization" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50" placeholder="Meta, Google, etc." />
    </div>

    <div class="flex justify-end gap-3 mt-8">
      <button @click="$emit('cancel')" class="px-6 py-3 rounded-full text-gray-400 hover:text-white transition-colors">Cancel</button>
      <button 
        @click="handleSubmit" 
        :disabled="loading"
        class="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-full font-bold transition-all disabled:opacity-50"
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

    if (imageFile.value) {
      const fileExt = imageFile.value.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `credentials/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, imageFile.value)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(filePath)
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
