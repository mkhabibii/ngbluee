<template>
  <div class="relative w-full h-[300px] overflow-hidden bg-[#f3f3f3]">
    <!-- BACKGROUND HITAM (SHAPE) -->
    <div
      class="absolute inset-0 bg-black z-0"
      style="clip-path: polygon(0 66%, 100% 14%, 100% 100%, 0% 100%)"
    ></div>

    <!-- MARQUEE HITAM -->
    <div class="absolute left-[-30%] w-[160%] rotate-[-6deg] z-20 border-6 border-b-white" style="top: 120px">
      <div class="flex whitespace-nowrap py-6 animate-[marquee-left_20s_linear_infinite]">
        <template v-for="n in 10" :key="n">
          <span class="flex items-center text-2xl font-extrabold text-white px-8 font-manrope">
            We design, develop, and launch brands online
            <span class="w-3 h-3 bg-white rounded-full mx-6"></span>
          </span>
        </template>
      </div>
    </div>

    <!-- MARQUEE PUTIH -->
    <div class="absolute left-[-30%] w-[160%] rotate-[6deg] z-30" style="top: 120px">
      <div class="flex whitespace-nowrap py-6 animate-[marquee-right_20s_linear_infinite]">
        <template v-for="n in 10" :key="n">
          <span class="flex items-center text-2xl font-extrabold text-black py-5 px-8 bg-[#e9e9f2] font-manrope">
            Designed with purpose — Built to perform
            <img src="/src/assets/img/star.png" class="w-6 h-6 mx-6" />
          </span>
        </template>
      </div>
    </div>
  </div>

  <section class="dark-zone porto-section relative w-full bg-black text-gray-900 py-32">

    <div class="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
      <!-- Section Header -->
      <div class="mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
        <div class="tracking-[-0.6em] overflow-hidden">
          <h2
            id="showcase-title"
            class="showcase font-sofia text-[10vw] lg:text-[10rem] leading-[0.9] font-extrabold text-white"
            ref="showcase"
          >
            SHOWCASE
          </h2>
        </div>

        <!-- Filters -->
        <div class="filters flex flex-wrap gap-4 mb-4">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            class="px-6 py-2 rounded-full border-2 border-white text-sm font-medium uppercase tracking-wider transition-all duration-300"
            :class="
              activeFilter === filter
                ? 'bg-white text-black border-black'
                : 'bg-transparent text-gray-400 hover:border-gray-900 hover:text-white'
            "
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.title"
          class="project-card group cursor-pointer bg-white/10 backdrop-blur border border-white/20 shadow-lg rounded-2xl"
        >
          <!-- Project Image -->
          <div class="w-full aspect-[3/2] overflow-hidden rounded-t-2xl relative">
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10"
            ></div>
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <!-- Floating Action Button -->
            <div
              class="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>

          <!-- Project Info -->
          <div class="project-info px-4 py-4">
            <div class="flex justify-between items-start mb-2">
              <!-- <span class="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">{{ project.category }}</span> -->
              <!-- <span class="text-xs font-mono text-gray-400">0{{ index + 1 }}</span> -->
            </div>
            <h3
              class="text-3xl text-white font-bold font-sofia mb-3 group-hover:text-purple-500 transition-colors"
            >
              {{ project.title }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tech"
                :key="tag"
                class="text-[10px] px-2 py-1 bg-gray-200 rounded text-gray-600"
                >{{ tag }}</span
              >
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
    description:
      'A futuristic landing page featuring WebGL experiments. Designed to push the boundaries of browser capabilities.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    tech: ['Vue.js', 'Three.js'],
  },
  {
    title: 'Arkitek',
    category: 'Web',
    description:
      'Minimalist architecture firm portfolio. Focusing on clean lines and negative space.',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop',
    tech: ['Nuxt', 'Tailwind'],
  },
  {
    title: 'Zen Mode',
    category: 'Mobile',
    description: 'Productivity app with a focus on mindfulness. Features ambient soundscapes.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    tech: ['Flutter', 'Firebase'],
  },
  {
    title: 'FinDash',
    category: 'UI/UX',
    description: 'Comprehensive financial dashboard design system with dark mode support.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tech: ['Figma', 'Prototyping'],
  },
  {
    title: 'E-Shop',
    category: 'Web',
    description: 'Modern e-commerce platform with real-time inventory and seamless checkout.',
    image:
      'https://images.unsplash.com/photo-1472851294608-415522f96319?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Node.js'],
  },
  {
    title: 'TravelGo',
    category: 'Mobile',
    description: 'Travel companion app for booking flights and discovering local hidden gems.',
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
    tech: ['React Native', 'Maps API'],
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return allProjects
  return allProjects.filter((p) => p.category === activeFilter.value)
})

onMounted(() => {
  // Title Animation
  const title = new SplitType('.showcase', {
    types: 'chars',
  })

  gsap.set(title.chars, {
    yPercent: -120,
    opacity: 0,
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.showcase',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
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
    ease: 'expo.out',
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
    ease: 'power2.out',
  })
})
</script>

<style>
@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@keyframes marquee-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
