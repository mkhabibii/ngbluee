<template>
  <section
    id="credential"
    ref="sectionRef"
    class="relative w-full h-screen bg-[#f6f4ee] text-gray-900 overflow-hidden border-t-[1px] border-black flex flex-col justify-center"
  >
    <div
      class="w-full pt-18 pb-16 sm:py-12 md:py-16 flex flex-col justify-center md:justify-between h-full"
    >
      <div class="header-wrap text-center mb-2 sm:mb-3 md:mb-4 shrink-0">
        <div class="overflow-hidden">
          <h2
            class="credential-title text-center font-extrabold font-sofia text-[12vw] lg:text-[8rem] tracking-[-0.07em] leading-none"
          >
            CREDENTIALS
          </h2>
        </div>
      </div>

      <!-- Carousel Container -->
      <div
        class="relative w-full overflow-hidden flex-none md:flex-1 flex items-center py-4 mt-8 sm:mt-12 md:mt-0"
      >
        <!-- Gradient Masks -->
        <div
          class="absolute inset-y-0 left-0 w-12 lg:w-20 bg-gradient-to-r from-[#f6f4ee] to-transparent z-10 pointer-events-none"
        ></div>
        <div
          class="absolute inset-y-0 right-0 w-12 lg:w-20 bg-gradient-to-l from-[#f6f4ee] to-transparent z-10 pointer-events-none"
        ></div>

        <!-- Slider Track - translated via GSAP ScrollTrigger -->
        <div
          class="flex flex-nowrap gap-8 sm:gap-12 md:gap-30 w-max px-[10vw] py-6 track"
          ref="sliderTrack"
          style="will-change: transform"
        >
          <!-- Items -->
          <div
            v-for="(cert, index) in certificates"
            :key="cert.id || index"
            class="cert-card shrink-0 select-none flex flex-col items-center w-[280px] sm:w-[380px] md:w-[460px] hover:-translate-y-1.5 transition-all duration-500 group"
          >
            <!-- Image Container with Rounded Corners on All Sides and Hover Effects -->
            <button
              @click="openModal(cert)"
              class="w-full aspect-[3/2] relative block overflow-hidden rounded-[32px] shadow-xl group cursor-pointer z-10 text-left border-none outline-none"
            >
              <!-- Certificate Image -->
              <img
                :src="cert.image_url"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Certificate"
              />

              <!-- White Shimmer / Shine Effect -->
              <div
                class="absolute -inset-y-2 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-20 transition-all duration-[800ms] ease-out group-hover:left-[150%] pointer-events-none z-20"
              ></div>

              <!-- Hover Button Overlay -->
              <div
                class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] z-30"
              >
                <span
                  class="font-manrope bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs md:text-base tracking-wider shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 inline-flex items-center gap-1.5"
                >
                  View
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </span>
              </div>
            </button>

            <!-- Details below the Certificate -->
            <div class="mt-6 flex flex-col items-center text-center px-4 w-full">
              <h3
                class="font-bold font-manrope text-lg sm:text-2xl text-gray-900 tracking-tight leading-tight line-clamp-1"
              >
                {{ cert.title }}
              </h3>
              <p class="font-manrope text-xs sm:text-base text-gray-500 mt-1">
                Issued by {{ cert.organization }} <span v-if="cert.year">, {{ cert.year }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Certificate Detail -->
    <Teleport to="body">
      <Transition name="fade-scale">
        <div
          v-if="isModalOpen && selectedCert"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-md"
            @click="closeModal"
          ></div>

          <!-- Modal Content Container -->
          <div
            class="modal-container relative bg-[#f6f4ee] w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl border border-black/10 flex flex-col z-10"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300 z-20 cursor-pointer border-none outline-none"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <!-- Modal Body -->
            <div class="p-6 sm:p-8 flex flex-col items-center">
              <!-- Large Image Wrapper -->
              <div class="w-full aspect-[3/2] overflow-hidden rounded-2xl shadow-md bg-black/5 flex items-center justify-center">
                <img
                  :src="selectedCert.image_url"
                  alt="Certificate Detail"
                  class="max-w-full max-h-full object-contain"
                />
              </div>

              <!-- Details Section -->
              <div class="mt-6 text-center w-full flex flex-col items-center">
                <h3
                  class="font-extrabold font-manrope text-xl sm:text-2xl text-gray-900 tracking-tight leading-snug max-w-2xl"
                >
                  {{ selectedCert.title }}
                </h3>
                <p class="font-manrope text-xs sm:text-base text-gray-500 mt-2">
                  Issued by {{ selectedCert.organization }}<span v-if="selectedCert.year">, {{ selectedCert.year }}</span>
                </p>

                <!-- Actions -->
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                  <!-- Verify Button -->
                  <a
                    v-if="selectedCert.credential_url"
                    :href="selectedCert.credential_url"
                    target="_blank"
                    class="font-manrope bg-black hover:bg-neutral-800 text-[#f6f4ee] px-8 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Verify Credential
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick, watch, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const sliderTrack = ref(null)
const certificates = ref([])
const isUsingMocks = ref(false)

const isModalOpen = ref(false)
const selectedCert = ref(null)

const openModal = (cert) => {
  selectedCert.value = cert
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCert.value = null
}

watch(isModalOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

const useFallbackData = () => {
  isUsingMocks.value = true
  certificates.value = [
    {
      id: 'mock-1',
      title: 'Belajar Laravel',
      organization: 'WPU Course',
      year: 'Dec 2024',
      image_url:
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
      credential_url: 'https://github.com',
    },
    {
      id: 'mock-2',
      title: 'Google UX Design Professional',
      organization: 'Coursera',
      year: 'Oct 2023',
      image_url:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      credential_url: 'https://coursera.org',
    },  
  ]
}

const fetchCertificates = async () => {
  try {
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) {
      console.error('Error fetching credentials from Supabase:', error)
      useFallbackData()
      return
    }

    if (data && data.length > 0) {
      certificates.value = data
      isUsingMocks.value = false
      console.log('Successfully fetched certificates:', data)
    } else {
      console.warn('Credentials table is empty. Using mock placeholder data.')
      useFallbackData()
    }
  } catch (err) {
    console.error('Exception during fetchCertificates:', err)
    useFallbackData()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)
  await fetchCertificates()
  await nextTick()

  // Title Split & Scroll Trigger Effect (identical to Essence.vue)
  const credTitle = new SplitType('.credential-title', {
    types: 'chars',
  })

  gsap.set(credTitle.chars, {
    yPercent: -120,
    opacity: 0,
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.credential-title',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
    })
    .to(credTitle.chars, {
      yPercent: 0,
      opacity: 1,
      ease: 'power4.out',
      stagger: {
        each: 0.05,
        from: 'center',
      },
    })

  if (certificates.value.length === 0) return

  const track = sliderTrack.value

  // Horizontal scroll linked to vertical page scroll via GSAP ScrollTrigger
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '#credential',
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true,
    },
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Hidden native scrollbars to keep design clean */
.slider-container::-webkit-scrollbar {
  display: none;
}

.credential-title {
  overflow: hidden;
}

.credential-title .char {
  display: inline-block;
}

/* Vue Transition fade-scale */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-active .modal-container,
.fade-scale-leave-active .modal-container {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
}

.fade-scale-enter-from .modal-container {
  transform: scale(0.9) translateY(20px);
}

.fade-scale-leave-to .modal-container {
  transform: scale(0.95) translateY(10px);
}
</style>
