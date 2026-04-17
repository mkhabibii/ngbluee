<template>
  <section class="porto-section relative w-full bg-gray-100 text-gray-900 py-32 overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
      
      <!-- Section Header -->
      <div class="header-wrap mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
        <div class="tracking-[-0.6em]">
          <h2 class="showcase-title overflow-hidden font-sofia text-[10vw] lg:text-[9rem] leading-[0.9] font-extrabold">
            RECENT
          </h2>
          <h2 class="showcase-title font-sofia text-[10vw] lg:text-[9rem] leading-[0.9] font-extrabold  bg-clip-text bg-gradient-to-r from-gray-800 to-gray-200">
            WORKS
          </h2>
        </div>

        <!-- Filters -->
         <div class="filters flex flex-wrap gap-4 mb-4">
           <button 
             v-for="filter in filters" 
             :key="filter"
             @click="activeFilter = filter"
             class="px-6 py-2 rounded-full border border-gray-300 text-sm font-medium uppercase tracking-wider transition-all duration-300"
             :class="activeFilter === filter ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 hover:border-gray-900 hover:text-black'"
           >
             {{ filter }}
           </button>
         </div>
      </div>
      
      <div class="w-full h-[1px] bg-gray-300 mb-20 separator scale-x-0 origin-left"></div>

      <!-- Projects Grid -->
      <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.title"
          class="project-card group cursor-pointer"
        >
          <!-- Project Image -->
          <div class="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 mb-6 relative">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
             <!-- Floating Action Button -->
            <div class="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </div>

          <!-- Project Info -->
          <div class="project-info">
             <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">{{ project.category }}</span>
                <span class="text-xs font-mono text-gray-400">0{{ index + 1 }}</span>
             </div>
             <h3 class="text-3xl font-bold font-sofia mb-3 group-hover:text-purple-700 transition-colors">{{ project.title }}</h3>
             <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{{ project.description }}</p>
             <div class="flex flex-wrap gap-2">
               <span v-for="tag in project.tech" :key="tag" class="text-[10px] px-2 py-1 bg-gray-200 rounded text-gray-600">{{ tag }}</span>
             </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'


gsap.registerPlugin(ScrollTrigger)

const filters = ['All', 'Web', 'UI/UX', 'Mobile']
const activeFilter = ref('All')

const allProjects = [
  {
    title: 'Neon Horizon',
    category: 'Web',
    description: 'A futuristic landing page featuring WebGL experiments. Designed to push the boundaries of browser capabilities.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    tech: ['Vue.js', 'Three.js']
  },
  {
    title: 'Arkitek',
    category: 'Web',
    description: 'Minimalist architecture firm portfolio. Focusing on clean lines and negative space.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop',
    tech: ['Nuxt', 'Tailwind']
  },
  {
    title: 'Zen Mode',
    category: 'Mobile',
    description: 'Productivity app with a focus on mindfulness. Features ambient soundscapes.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    tech: ['Flutter', 'Firebase']
  },
  {
    title: 'FinDash',
    category: 'UI/UX',
    description: 'Comprehensive financial dashboard design system with dark mode support.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tech: ['Figma', 'Prototyping']
  },
   {
    title: 'E-Shop',
    category: 'Web',
    description: 'Modern e-commerce platform with real-time inventory and seamless checkout.',
    image: 'https://images.unsplash.com/photo-1472851294608-415522f96319?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Node.js']
  },
   {
    title: 'TravelGo',
    category: 'Mobile',
    description: 'Travel companion app for booking flights and discovering local hidden gems.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
    tech: ['React Native', 'Maps API']
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return allProjects
  return allProjects.filter(p => p.category === activeFilter.value)
})

onMounted(() => {
  // Title Animation
  const title = new SplitType('.showcase-title', {
    types: 'chars',
  })

  gsap.set(title.chars, {
    yPercent: -120,
    opacity: 0,
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.showcase-title',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.8,
      },
    })
    .to(title.chars, {
      yPercent: 0,
      opacity: 1,
      ease: 'power4.out',
      stagger: {
        each: 0.05,
        from: 'center',
      },
    })
  // Separator Line Animation
  gsap.to('.separator', {
    scrollTrigger: {
      trigger: '.header-wrap',
      start: 'top 70%',
    },
    scaleX: 1,
    duration: 1.5,
    ease: 'expo.out'
  })

  // Grid Animation
  gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    })
})
</script>