<template>
  <!-- Bagian Marquee tetap (sudah oke) -->
  <div class="relative w-full h-[300px] overflow-hidden bg-[#f3f3f3] will-change-transform">
    <div
      class="absolute inset-0 bg-black z-0"
      style="clip-path: polygon(0 66%, 100% 14%, 100% 100%, 0% 100%)"
    ></div>
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
    <div class="w-full px-4 sm:px-6 lg:px-12 relative z-10">
      <div class="mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
        <div class="tracking-[-0.6em] overflow-hidden text-center md:text-left w-full md:w-auto">
          <h2
            class="showcase font-sofia text-[12vw] lg:text-[8rem] leading-[0.9] font-extrabold text-white"
          >
            SHOWCASE
          </h2>
        </div>
        <div class="filters flex flex-wrap justify-center md:justify-end gap-4 mb-4">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            class="px-6 py-2 rounded-full border-2 border-white text-xs md:text-sm font-medium uppercase tracking-wider transition-all duration-300"
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

      <!-- Responsive Accordion Showcase -->
      <div
        class="accordion-container flex flex-col lg:flex-row w-full h-auto lg:h-[60h] border-t border-b border-white/40 overflow-hidden"
      >
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="accordion-item group relative flex flex-col p-6 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/40 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden bg-black hover:bg-[#0a0a0a] min-h-[120px] h-[120px] hover:h-[480px] lg:h-full lg:flex-1 lg:hover:flex-[1.8]"
        >
          <!-- Top Section: Number & Title -->
          <div class="relative z-10 flex flex-col gap-3 lg:gap-6">
            <span
              class="font-sofia text-[12px] lg:text-[16px] font-semibold tracking-[0.02em] text-white/50 uppercase"
            >
              00 - {{ index + 1 }}
            </span>
            <h3
              class="text-lg lg:text-3xl font-sofia font-bold text-white uppercase tracking-tighter leading-[0.9] max-w-[300px] transition-transform duration-500 group-hover:translate-y-[-5px]"
            >
              {{ project.title }}
            </h3>
          </div>

          <!-- Revealed Content on Hover/Tap -->
          <div
            class="item-content mt-4 lg:mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-6 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto flex-1 flex flex-col items-center justify-center gap-4 lg:gap-10 text-center"
          >
            <!-- Project Image Container -->
            <div
              class="w-[85%] lg:w-[70%] max-w-[400px] aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl"
            >
              <img
                :src="project.image_url"
                class="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
            </div>

            <!-- Description & Action -->
            <div class="max-w-md space-y-4 lg:space-y-10 flex flex-col items-center px-4">
              <p
                class="text-white/60 text-[11px] lg:text-sm leading-relaxed font-manrope font-light max-w-xs lg:max-w-sm"
              >
                {{ project.tagline || project.description }}
              </p>

              <button
                @click.stop="openModal(project)"
                class="px-8 lg:px-10 py-3 lg:py-4 rounded-full bg-white text-black text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- THE CREATIVE EDITION MODAL -->
  <transition name="modal-exquisite">
    <div
      v-if="isModalOpen && selectedProject"
      class="fixed inset-0 z-[10000] bg-[#050505] overflow-y-auto"
    >
      <!-- Ambient Background Glows -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/20 blur-[150px] rounded-full"
        ></div>
        <div
          class="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[150px] rounded-full"
        ></div>
      </div>

      <div class="min-h-screen w-full relative z-10 py-12 px-6 lg:px-20 max-w-[1400px] mx-auto">
        <!-- Top Navigation -->
        <nav class="flex justify-between items-center mb-20">
          <div class="flex items-center gap-6">
            <button
              @click="closeModal"
              class="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all"
            >
              <div
                class="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-purple-500 transition-all"
              ></div>
              CLOSE CASE STUDY
            </button>
          </div>
          <div
            class="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold hidden md:block"
          >
            HABIBI / SELECTION / {{ selectedProject.category }}
          </div>
        </nav>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <!-- LEFT CONTENT (Column 1-8) -->
          <div class="lg:col-span-8 space-y-24">
            <!-- Hero Title Area -->
            <header class="space-y-8">
              <div class="flex items-center gap-4 text-purple-500">
                <span class="text-xs font-black tracking-widest">01</span>
                <div class="w-12 h-[1px] bg-purple-500/30"></div>
                <span class="text-[10px] font-bold uppercase tracking-[0.3em]"
                  >Project Overview</span
                >
              </div>
              <h1
                class="text-7xl md:text-[10rem] font-bold text-white tracking-tighter leading-[0.8] uppercase reveal-text"
              >
                {{ selectedProject.title }}
              </h1>
              <p
                v-if="selectedProject.tagline"
                class="text-xl md:text-3xl text-white/40 font-serif italic max-w-2xl leading-tight"
              >
                "{{ selectedProject.tagline }}"
              </p>
            </header>

            <!-- Visual Showcase (Mockups) -->
            <div class="relative group">
              <!-- Frame Decor -->
              <div
                class="absolute -inset-4 border border-white/5 rounded-[2.5rem] -z-10 group-hover:border-purple-500/20 transition-colors duration-700"
              ></div>

              <!-- The Device -->
              <div
                class="bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] p-4 md:p-10 border border-white/10 shadow-2xl"
              >
                <!-- Desktop/Web Frame -->
                <div
                  v-if="selectedProject.category !== 'Mobile'"
                  class="browser-frame w-full aspect-[16/10] bg-[#111] rounded-xl overflow-hidden border border-white/10 flex flex-col"
                >
                  <div class="h-10 bg-[#1a1a1a] flex items-center px-4 gap-2">
                    <div class="flex gap-1.5">
                      <div class="w-2 h-2 rounded-full bg-white/10"></div>
                      <div class="w-2 h-2 rounded-full bg-white/10"></div>
                    </div>
                    <div
                      class="flex-1 text-center text-[9px] text-white/20 font-mono tracking-widest uppercase"
                    >
                      Case_Study_View.exe
                    </div>
                  </div>
                  <div class="flex-1 overflow-hidden relative bg-black">
                    <img
                      :key="activeSlideIndex"
                      :src="currentImage"
                      class="w-full h-full object-cover object-top animate-glitch-in"
                    />
                  </div>
                </div>

                <!-- Mobile/Phone Frame -->
                <div v-else class="flex justify-center py-6">
                  <div
                    class="w-[300px] aspect-[9/19] bg-[#0c0c0c] rounded-[3.5rem] border-[10px] border-[#1a1a1a] shadow-3xl overflow-hidden relative"
                  >
                    <div
                      class="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-full z-20"
                    ></div>
                    <img
                      :key="activeSlideIndex"
                      :src="currentImage"
                      class="w-full h-full object-cover animate-glitch-in"
                    />
                  </div>
                </div>
              </div>

              <!-- Premium Slider Navigation -->
              <div
                v-if="selectedProject.screenshots?.length > 0"
                class="flex flex-wrap gap-3 mt-10 justify-center"
              >
                <button
                  v-for="(shot, idx) in [
                    { image_url: selectedProject.image_url, title: 'OVERVIEW' },
                    ...selectedProject.screenshots,
                  ]"
                  :key="idx"
                  @click="activeSlideIndex = idx"
                  class="relative px-6 py-3 overflow-hidden transition-all group"
                  :class="
                    activeSlideIndex === idx ? 'text-white' : 'text-white/30 hover:text-white/60'
                  "
                >
                  <span class="text-[9px] font-black tracking-[0.3em] uppercase relative z-10">{{
                    shot.title || `PART ${idx}`
                  }}</span>
                  <div
                    v-if="activeSlideIndex === idx"
                    class="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500"
                  ></div>
                </button>
              </div>
            </div>

            <!-- Content Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12">
              <div class="space-y-6">
                <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">
                  The Context
                </h4>
                <p class="text-white/60 leading-relaxed font-light text-lg">
                  {{ selectedProject.description }}
                </p>
              </div>
              <div class="space-y-8" v-if="selectedProject.features?.length > 0">
                <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">
                  Key Execution
                </h4>
                <ul class="space-y-4">
                  <li
                    v-for="feat in selectedProject.features"
                    :key="feat"
                    class="flex gap-4 text-white/50 text-sm border-l border-white/10 pl-6 hover:border-purple-500 transition-colors"
                  >
                    {{ feat }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDEBAR (Column 9-12) -->
          <aside class="lg:col-span-4 space-y-12">
            <!-- Technical Card -->
            <div
              class="sticky top-12 bg-white/[0.02] border border-white/5 rounded-3xl p-10 space-y-12 backdrop-blur-2xl"
            >
              <div class="space-y-8">
                <div class="space-y-2">
                  <p class="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">
                    CREDIT / ROLE
                  </p>
                  <p class="text-xs font-bold text-white uppercase tracking-wider">
                    {{ selectedProject.role || 'Full-Stack Developer' }}
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">
                    TIMELINE / YEAR
                  </p>
                  <p class="text-xs font-bold text-white uppercase tracking-wider">
                    {{ selectedProject.year || '2025' }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <p class="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">
                  TECHNICAL STACK
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.tech"
                    :key="tech"
                    class="text-[9px] font-bold px-3 py-1.5 rounded-md border border-white/5 text-white/40 bg-white/5 uppercase"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="space-y-3 pt-6">
                <a
                  v-if="selectedProject.demo_url"
                  :href="selectedProject.demo_url"
                  target="_blank"
                  class="w-full h-14 rounded-xl bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-purple-600 hover:text-white transition-all group"
                >
                  LAUNCH PROJECT
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  v-if="selectedProject.github_url"
                  :href="selectedProject.github_url"
                  target="_blank"
                  class="w-full h-14 rounded-xl border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all group"
                >
                  CODE REPOSITORY <span class="group-hover:rotate-45 transition-transform">↗</span>
                </a>
              </div>
            </div>

            <!-- Signature Footer -->
            <div class="px-6 text-center lg:text-left space-y-4">
              <div class="h-[1px] w-full bg-white/5"></div>
              <p class="text-[8px] leading-loose uppercase tracking-[0.4em] text-white/10">
                This case study was carefully curated to demonstrate technical proficiency and
                design sensibilities.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, nextTick, watch } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const filters = ['All', 'Web', 'UI/UX', 'Mobile']
const activeFilter = ref('All')
const allProjects = ref([])

const fetchProjects = async () => {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  allProjects.value = data || []
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return allProjects.value
  return allProjects.value.filter((p) => p.category === activeFilter.value)
})

const selectedProject = ref(null)
const isModalOpen = ref(false)
const activeSlideIndex = ref(0)

const currentImage = computed(() => {
  if (!selectedProject.value) return ''
  if (activeSlideIndex.value === 0) return selectedProject.value.image_url
  return selectedProject.value.screenshots[activeSlideIndex.value - 1]?.image_url
})

watch(isModalOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    activeSlideIndex.value = 0
  } else {
    document.body.style.overflow = ''
  }
})

const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleKey = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) closeModal()
}

onMounted(async () => {
  await fetchProjects()
  await nextTick()

  // Title Animation
  const title = new SplitType('.showcase', { types: 'chars' })
  gsap.set(title.chars, { yPercent: -120, opacity: 0 })
  gsap
    .timeline({
      scrollTrigger: { trigger: '.showcase', start: 'top 80%', end: 'top 30%', scrub: 1 },
    })
    .to(title.chars, {
      yPercent: 0,
      opacity: 1,
      ease: 'power4.out',
      stagger: { each: 0.05, from: 'center' },
    })

  // Accordion Stagger
  gsap.fromTo(
    '.accordion-item',
    { y: 50, opacity: 0 },
    {
      scrollTrigger: { trigger: '.accordion-container', start: 'top 80%' },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    },
  )

  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})
</script>

<style>
/* EXQUISITE MODAL TRANSITION */
.modal-exquisite-enter-active,
.modal-exquisite-leave-active {
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-exquisite-enter-from,
.modal-exquisite-leave-to {
  transform: scale(0.9) translateY(100%);
  opacity: 0;
  filter: blur(20px);
}

/* GLITCH IN ANIMATION FOR IMAGES */
.animate-glitch-in {
  animation: glitchIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes glitchIn {
  0% {
    opacity: 0;
    transform: scale(1.1) rotate(1deg);
    filter: contrast(1.5) brightness(2);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
    filter: contrast(1) brightness(1);
  }
}

/* REVEAL TEXT ANIMATION */
.reveal-text {
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transform: translateY(50px);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translateY(0);
  }
}

.modal-open {
  overflow: hidden;
}

/* ANIMASI MARQUEE (WAJIB ADA AGAR JALAN) */
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
/* EXQUISITE MODAL TRANSITION */
.modal-exquisite-enter-active,
.modal-exquisite-leave-active {
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-exquisite-enter-from,
.modal-exquisite-leave-to {
  transform: scale(0.9) translateY(100%);
  opacity: 0;
  filter: blur(20px);
}
/* GLITCH IN ANIMATION FOR IMAGES */
.animate-glitch-in {
  animation: glitchIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes glitchIn {
  0% {
    opacity: 0;
    transform: scale(1.1) rotate(1deg);
    filter: contrast(1.5) brightness(2);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
    filter: contrast(1) brightness(1);
  }
}
/* REVEAL TEXT ANIMATION */
.reveal-text {
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes reveal {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transform: translateY(50px);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translateY(0);
  }
}
.modal-open {
  overflow: hidden;
}
</style>
