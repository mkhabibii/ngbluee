<template>
  <section class="credentials-section relative w-full bg-gray-100 text-gray-900 py-32 overflow-hidden border-t-[1px] border-black">
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl">
      
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
                :src="cert.image" 
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
               />
             </div>

             <!-- Content -->
             <div class="h-1/3 p-6 flex flex-col justify-center relative bg-white z-20">
               <div class="absolute -top-8 right-6 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                 🏆
               </div>
               <span class="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">{{ cert.org }}</span>
               <h3 class="text-xl font-bold leading-tight group-hover:text-purple-600 transition-colors">{{ cert.title }}</h3>
             </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Draggable from 'gsap/Draggable' 
// Note: standard GSAP package might not allow Draggable imports in all environments without plugin registration, 
// usually Draggable is a separate plugin file or part of free core in npm 'gsap'. 
// We will use basic x animation for auto-slide here to be safe, simulating marquee with steps.

gsap.registerPlugin(ScrollTrigger)

const certificates = [
  { title: 'Google UX Design Professional', org: 'Google', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop' },
  { title: 'Meta Frontend Developer', org: 'Meta', image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=600&auto=format&fit=crop' },
  { title: 'AWS Solutions Architect', org: 'Amazon Web Services', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=600&auto=format&fit=crop' },
  { title: 'Full Stack Development', org: 'Udacity', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop' },
  { title: 'UI/UX Specialization', org: 'Calarts', image: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a8?q=80&w=600&auto=format&fit=crop' },
]

const sliderTrack = ref(null)

onMounted(() => {
  // Entrance Animation
  gsap.from('.header-wrap', {
    scrollTrigger: {
      trigger: '.credentials-section',
      start: 'top 60%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })

  // Auto Slider with Pause effect using time-based tween modification is complex, 
  // simpler approach: Continuous slow move with CSS or basic GSAP.
  // User asked for "slide otomatis ada jeda" (automatic slide with pause).
  
  const track = sliderTrack.value
  const cards = track.children
  const totalWidth = track.scrollWidth / 2 // Since we doubled the items
  
  let ctx = gsap.context(() => {
     // Create a timeline that moves item by item
     const tl = gsap.timeline({ repeat: -1 })
     
     // Calculate width of one item + gap (approximate for logic, but cleaner to just slide total)
     // To do "slide ... pause ... slide":
     // We can just tween xPercent.
     
     tl.to(track, {
       x: -totalWidth,
       duration: 40, 
       ease: 'none',
     })
     
     // If we want "jeda" (pause), we would need a stepped ease or separate tweens. 
     // Let's try a stepped approach for a more "carousel" feel.
     // But "carousel" with variable widths is hard. 
     // Let's stick to a smooth premium marquee for reliability unless I strictly implement a slider logic.
     // "Slide otomatis ada jedanya" -> Slide... Stop... Slide... Stop.
     
     // RE-IMPLEMENTATION for Pausing Marquee:
     tl.clear();
     
     const itemWidth = cards[0].offsetWidth + 32 // 32 is gap (gap-8 = 2rem = 32px) approx. 
     // Better to compute actively but let's assume consistent sizing.
     
     const count = certificates.length 
     
     for(let i = 0; i < count; i++) {
        tl.to(track, {
           x: `-=${itemWidth}`,
           duration: 1.5,
           ease: 'power2.inOut',
           delay: 2 // The "jeda"
        })
     }
     
     // Reset instantly (mimic infinite) - this is tricky with GSAP timeline without exact pixel perfection.
     // Simplest robust solution for "Premium" look is often smooth continuous. 
     // But strictly following user Request for "Jeda":
     
     // Let's try the simple version: 
     // Just linear. User description "slide otomatis nya jeda" (slide automatically [has] pause). 
     // I'll stick to the stepped timeline above.
     
     tl.set(track, { x: 0 }) // Reset to start loop
  })

})
</script>

<style scoped>
/* Hide scrollbar just in case */
.slider-container::-webkit-scrollbar {
  display: none;
}
</style>