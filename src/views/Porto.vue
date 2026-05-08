<template>
  <div class="relative w-full h-[300px] overflow-hidden bg-[#f3f3f3]">
    <!-- BACKGROUND HITAM (SHAPE) -->
    <div
      class="absolute inset-0 bg-black z-0 will-change-transform"
      style="clip-path: polygon(0 66%, 100% 14%, 100% 100%, 0% 100%)"
    ></div>

    <!-- MARQUEE HITAM -->
    <div
      class="absolute left-[-30%] w-[160%] rotate-[-6deg] z-20 border-6 border-b-white"
      style="top: 120px"
    >
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
          <span
            class="flex items-center text-2xl font-extrabold text-black py-5 px-8 bg-[#e9e9f2] font-manrope"
          >
            Designed with purpose — Built to perform
            <img src="/src/assets/img/star.png" class="w-6 h-6 mx-6" />
          </span>
        </template>
      </div>
    </div>
  </div>

  <section
    id="showcase"
    class="dark-zone porto-section relative w-full bg-black text-gray-900 py-32"
  >
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
          @click="openModal(project)"
          class="project-card group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-purple-800 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div
              class="light-sweep absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12"
            ></div>
          </div>
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
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tag in project.tech"
                :key="tag"
                class="text-sm px-3 py-1 border border-white/20 rounded-lg text-white"
                >{{ tag }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- modal -->
  <!-- MODAL -->
  <transition name="modal" @after-leave="selectedProject = null">
    <div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <!-- BACKDROP -->
      <div
        class="modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-md"
        @click="closeModal"
      ></div>

      <!-- MODAL -->
      <div
        class="modal-content relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d]/90 shadow-[0_20px_100px_rgba(0,0,0,0.7)]"
        @click.stop
      >
        <!-- CLOSE -->
        <button
          @click="closeModal"
          class="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/10"
        >
          ✕
        </button>

        <div class="grid min-h-[620px] grid-cols-1 lg:grid-cols-2">
          <!-- IMAGE -->
          <div class="relative overflow-hidden">
            <img
              :src="selectedProject?.image"
              :alt="selectedProject?.title"
              class="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            ></div>

            <div
              class="absolute bottom-6 left-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-xl"
            >
              Featured Project
            </div>
          </div>

          <!-- CONTENT -->
          <div class="flex flex-col justify-between p-8 lg:p-12">
            <div>
              <!-- CATEGORY -->
              <span
                class="mb-5 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-purple-300"
              >
                {{ selectedProject?.category }}
              </span>

              <!-- TITLE -->
              <h2 class="mb-6 text-5xl font-black leading-none text-white lg:text-6xl">
                {{ selectedProject?.title }}
              </h2>

              <!-- DESCRIPTION -->
              <p class="max-w-xl text-base leading-relaxed text-gray-400 lg:text-lg">
                {{ selectedProject?.description }}
              </p>

              <!-- TECH STACK -->
              <div class="mt-10">
                <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Tech Stack
                </h3>

                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="tech in selectedProject?.tech"
                    :key="tech"
                    class="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-gray-300 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- ACTION -->
            <div class="mt-14 flex flex-wrap gap-4">
              <a
                :href="selectedProject?.github"
                target="_blank"
                class="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-purple-500 hover:text-white"
              >
                Github
                <span class="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                :href="selectedProject?.demo"
                target="_blank"
                class="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:bg-white/10"
              >
                Live Demo
                <span class="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
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
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
  {
    title: 'Arkitek',
    category: 'Web',
    description:
      'Minimalist architecture firm portfolio. Focusing on clean lines and negative space.',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop',
    tech: ['Nuxt', 'Tailwind'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
  {
    title: 'Zen Mode',
    category: 'Mobile',
    description: 'Productivity app with a focus on mindfulness. Features ambient soundscapes.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    tech: ['Flutter', 'Firebase'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
  {
    title: 'FinDash',
    category: 'UI/UX',
    description: 'Comprehensive financial dashboard design system with dark mode support.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tech: ['Figma', 'Prototyping'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
  {
    title: 'E-Shop',
    category: 'Web',
    description: 'Modern e-commerce platform with real-time inventory and seamless checkout.',
    image:
      'https://images.unsplash.com/photo-1472851294608-415522f96319?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Node.js'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
  {
    title: 'TravelGo',
    category: 'Mobile',
    description: 'Travel companion app for booking flights and discovering local hidden gems.',
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
    tech: ['React Native', 'Maps API'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
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
  gsap.fromTo(
    '.project-card',
    {
      y: 50,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    },
  )

  document.fonts.ready.then(() => {
    ScrollTrigger.refresh()
  })

  // modal animate
  const handleKey = (e) => {
    if (e.key === 'Escape') closeModal()
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKey)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
  })
})

const selectedProject = ref(null)
const isModalOpen = ref(false)

const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true

  document.body.classList.add('modal-open')
}

const closeModal = () => {
  isModalOpen.value = false

  document.body.classList.remove('modal-open')
}

const handleKey = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}
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

.project-card:hover .light-sweep {
  animation: sweep 0.9s ease forwards;
}

@keyframes sweep {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}

/* modal style */
body.modal-open {
  overflow: hidden;
}

/* MODAL */
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal-enter-active .modal-backdrop,
.modal-leave-active .modal-backdrop {
  transition:
    opacity 0.45s ease,
    backdrop-filter 0.45s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition:
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.45s ease;
}

.modal-enter-from .modal-backdrop,
.modal-leave-to .modal-backdrop {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.modal-enter-to .modal-backdrop,
.modal-leave-from .modal-backdrop {
  opacity: 1;
  backdrop-filter: blur(14px);
}

.modal-enter-from .modal-content {
  opacity: 0;
  transform: translateY(40px) scale(0.94);
}

.modal-enter-to .modal-content {
  opacity: 1;
  transform: translateY(0px) scale(1);
}

.modal-leave-from .modal-content {
  opacity: 1;
  transform: translateY(0px) scale(1);
}

.modal-leave-to .modal-content {
  opacity: 0;
  transform: translateY(30px) scale(0.96);
}
</style>
