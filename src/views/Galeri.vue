<template>
  <section class="gallery-section relative w-full bg-black text-white py-32 overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl">
      
      <!-- Header -->
      <div class="gallery-header mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <h2 class="font-sofia text-[10vw] lg:text-[7rem] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
            VISUALS
          </h2>
        </div>
        <p class="text-gray-400 max-w-md text-right md:text-left self-end mb-2">
          A collection of moments and perspectives captured through the lens.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-4 h-[120vh] md:h-[80vh]">
        
        <!-- Large Feature Item -->
        <div class="gallery-item md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" 
            alt="Feature"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span class="text-white font-mono uppercase tracking-widest text-sm">Analog Gear</span>
          </div>
        </div>

        <!-- Tall Item -->
        <div class="gallery-item md:col-span-1 md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1542038784424-48ed70438506?q=80&w=1000&auto=format&fit=crop" 
            alt="Tall"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span class="text-white font-mono uppercase tracking-widest text-sm">Mood</span>
          </div>
        </div>
        
        <!-- Standard Item -->
        <div class="gallery-item relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop" 
            alt="Standard"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <!-- Wide Item -->
         <div class="gallery-item md:col-span-2 relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" 
            alt="Wide"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span class="text-white font-mono uppercase tracking-widest text-sm">Neon City</span>
          </div>
        </div>

        <!-- Standard Item -->
        <div class="gallery-item relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-900">
           <img 
            src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?q=80&w=1000&auto=format&fit=crop" 
            alt="Standard"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

         <!-- Standard Item -->
        <div class="gallery-item relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-900">
           <img 
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop" 
            alt="Standard"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.gallery-header', {
    scrollTrigger: {
      trigger: '.gallery-section',
      start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  })

  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery-section',
      start: 'top 60%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>