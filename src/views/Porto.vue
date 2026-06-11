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
const openIndex = ref(null) // untuk toggle mobile

const currentImage = computed(() => {
  if (!selectedProject.value) return ''
  if (activeSlideIndex.value === 0) return selectedProject.value.image_url
  return selectedProject.value.screenshots[activeSlideIndex.value - 1]?.image_url
})

// Toggle accordion di mobile (click buka/tutup)
const toggleMobile = (index) => {
  if (window.innerWidth < 1024) {
    openIndex.value = openIndex.value === index ? null : index
  }
}

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

/* ANIMASI MARQUEE */
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

/* =============================================
   ACCORDION — MOBILE: max-height toggle
   ============================================= */
.accordion-item {
  /* Mobile default: collapsed */
  max-height: 100px;
  transition: max-height 0.7s cubic-bezier(0.23, 1, 0.32, 1),
              background 0.3s ease,
              flex 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}

.accordion-item.is-open {
  /* Mobile open: expanded */
  max-height: 560px;
}

/* Mobile: tampilkan konten saat is-open */
.accordion-item.is-open .item-content {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Desktop: reset max-height, pakai flex-grow */
@media (min-width: 1024px) {
  .accordion-item {
    max-height: none !important;
  }
}
</style>