<template>
  <section id="credential" class="relative w-full bg-gray-100 text-gray-900 py-32 overflow-hidden border-t-[1px] border-black">
    <div class="w-full px-4 sm:px-6 lg:px-12">
      
      <div class="header-wrap text-center mb-20">
         <h2 class="font-sofia text-[12vw] lg:text-[10rem] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400">
           CERTIFIED
         </h2>
         <p class="text-gray-500 mt-4 tracking-widest font-mono text-xs lg:text-sm uppercase">
           Recognition & Achievements
         </p>
      </div>

      <!-- Carousel Container -->
      <div class="relative w-full overflow-hidden slider-container">
        
        <!-- Gradient Masks -->
        <div class="absolute inset-y-0 left-0 w-12 lg:w-32 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-12 lg:w-32 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>

        <!-- Slider Track -->
        <div class="flex gap-8 lg:gap-12 w-max px-12 track" ref="sliderTrack">
          <!-- Items -->
          <div 
            v-for="(cert, index) in [...certificates, ...certificates]" 
            :key="index"
            class="cert-card relative w-[280px] sm:w-[350px] aspect-[4/5] bg-white rounded-2xl shadow-xl overflow-hidden group shrink-0 select-none"
          >
             <!-- Image -->
             <div class="h-2/3 w-full overflow-hidden relative">
               <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
               <img 
                :src="cert.image_url" 
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
               />
             </div>

             <!-- Content -->
             <div class="h-1/3 p-6 flex flex-col justify-center relative bg-white z-20">
               <div class="absolute -top-8 right-6 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                 🏆
               </div>
               <span class="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">{{ cert.organization }}</span>
               <h3 class="text-xl font-bold leading-tight group-hover:text-purple-600 transition-colors">{{ cert.title }}</h3>
             </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const certificates = ref([])

const fetchCertificates = async () => {
  const { data } = await supabase.from('credentials').select('*').order('created_at', { ascending: false })
  certificates.value = data || []
}

const sliderTrack = ref(null)

onMounted(async () => {
  await fetchCertificates()
  await nextTick()

  // Entrance Animation
  gsap.from('.header-wrap', {
    scrollTrigger: {
      trigger: '#credential',
      start: 'top 60%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  
  if (certificates.value.length === 0) return

  const track = sliderTrack.value
  const cards = track.children
  const totalWidth = track.scrollWidth / 2
  
  let ctx = gsap.context(() => {
     const tl = gsap.timeline({ repeat: -1 })
     
     tl.clear();
     
     const itemWidth = cards[0].offsetWidth + 32 
     const count = certificates.value.length 
     
     for(let i = 0; i < count; i++) {
        tl.to(track, {
           x: `-=${itemWidth}`,
           duration: 1.5,
           ease: 'power2.inOut',
           delay: 2 
        })
     }
     
     tl.set(track, { x: 0 }) 
  })

})
</script>

<style scoped>
/* Hide scrollbar just in case */
.slider-container::-webkit-scrollbar {
  display: none;
}
</style>