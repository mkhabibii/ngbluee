<template>
  <!-- Header Contact Links -->
  <div
    class="w-full px-4 sm:px-6 lg:px-12 mt-32 md:mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs md:text-lg uppercase tracking-widest z-10 relative"
  >
    <div class="flex flex-col gap-2">
      <span class="font-semibold text-gray-900">Available for collaboration</span>
      <a href="mailto:habiboy0607@gmail.com" class="group flex items-center gap-2">
        <span
          class="border-b border-gray-700 pb-0.5 group-hover:border-black transition-colors text-gray-900"
          >habiboy0607@gmail.com</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 transform rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-900"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>

    <!-- LinkedIn-->
    <div class="flex flex-col gap-2 md:text-right md:items-end">
      <span class="font-semibold text-gray-900">Recent Work</span>
      <a
        href="https://www.linkedin.com/in/muhammadkhoerulhabibi/"
        class="group flex items-center gap-2"
        target="blank"
      >
        <span
          class="border-b border-gray-700 pb-0.5 group-hover:border-black transition-colors text-gray-900"
          >LinkedIn Profile</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 transform rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-900"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>
  </div>

  <!-- Main Title Area -->
  <div class="title mt-12 sm:mt-6 lg:mt-16 relative z-10">
    <h2
      id="about"
      ref="aboutTitle"
      class="about-title text-center font-extrabold font-sofia text-[12vw] lg:text-[8rem] tracking-[-0.07em] leading-none text-gray-900"
    >
      ESSENCE
    </h2>
  </div>

  <!-- Content Area  -->
  <section
    ref="sectionRef"
    class="about-section w-full relative mt-8 lg:mt-16 lg:mb-20 flex justify-center"
  >
    <div
      ref="cardRef"
      class="bg-black text-white py-16 px-6 sm:px-12 lg:p-20 relative overflow-hidden shadow-2xl mx-auto w-full rounded-none"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-stretch items-start">
        <!-- Left Column -->
        <div
          class="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/20 pb-12 lg:pb-0 lg:pr-16 flex flex-col justify-between h-full"
        >
          <!-- Top Row of Left Column -->
          <div class="flex items-start gap-4">
            <span
              class="font-sofia font-extrabold text-[5rem] lg:text-[7rem] leading-none text-white tracking-tighter"
              >ABOUT</span
            >
            <span class="font-mono text-sm lg:text-lg text-white/80 mt-2 uppercase tracking-widest"
              >ME</span
            >
          </div>

          <!-- Profile & Bio -->
          <div class="mt-12 lg:mt-24">
            <div class="flex items-center">
              <div>
                <h4 class="font-manrope font-bold text-lg lg:text-xl text-white">
                  Muhammad Khoerul Habibi
                </h4>
                <p class="font-manrope text-xs lg:text-sm text-white/70">
                  Web Developer Enthusiast
                </p>
              </div>
            </div>

            <p
              class="reveal-text text-sm lg:text-base text-white/80 leading-relaxed font-manrope mt-6 text-justify"
            >
              I’m <span class="font-black text-white">Muhammad Khoerul Habibi</span>, a web
              developer and UI designer based in Yogyakarta. I build responsive and scalable web
              applications with a focus on performance, usability, and clean architecture.
            </p>
          </div>
        </div>

        <div class="lg:col-span-7 lg:pl-4">
          <!-- Header Statement -->
          <h3
            class="reveal-text text-xl lg:text-3xl font-bold leading-snug font-manrope text-white"
          >
            I craft digital experiences that blend aesthetics with functionality.
          </h3>

          <p
            class="reveal-text text-sm lg:text-lg leading-relaxed text-white/80 font-manrope mt-8 text-justify"
          >
            I turn complex ideas into intuitive interfaces by combining structured backend systems
            with precise and consistent UI design. My goal is to deliver efficient, maintainable,
            and user-focused digital products.
          </p>

          <!-- Tech Stack -->
          <div class="mt-12 border-t border-white/20 pt-8">
            <h4
              class="font-manrope font-bold text-xs lg:text-lg text-white uppercase tracking-widest mb-6"
            >
              Core Tech Stack
            </h4>

            <div class="flex flex-wrap gap-2.5">
              <span
                v-for="(skill, index) in skills"
                :key="index"
                class="skill-tag px-4 py-2 border border-white/20 rounded-full text-xs lg:text-sm text-white/90 hover:bg-white hover:text-black transition-all duration-300 cursor-default backdrop-blur-sm"
              >
                {{ skill }}
              </span>
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
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const cardRef = ref(null)

const skills = ref([
  'PHP',
  'Laravel',
  'Vue',
  'Tailwind CSS',
  'Bootstrap',
  'JavaScript',
  'GSAP',
  'Node Js',
  'Figma',
  'UI/UX Design',
  'Git',
  'Postman',
  'MySQL',
  'Laragon',
])

onMounted(() => {
  const title = new SplitType('.about-title', {
    types: 'chars',
  })

  gsap.set(title.chars, {
    yPercent: -120,
    opacity: 0,
  })

  // Title Scroll Trigger
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.about-title',
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

  // Background Scroll Effect (Full width -> Boxed card)
  if (cardRef.value && sectionRef.value) {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        cardRef.value,
        {
          width: '100%',
          borderRadius: '0px',
        },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1,
          },
          width: 'calc(100% - 12rem)',
          borderRadius: '3.5rem',
          ease: 'none',
        },
      )
    })

    mm.add('(min-width: 640px) and (max-width: 1023px)', () => {
      gsap.fromTo(
        cardRef.value,
        {
          width: '100%',
          borderRadius: '0px',
        },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1,
          },
          width: 'calc(100% - 6rem)',
          borderRadius: '2.5rem',
          ease: 'none',
        },
      )
    })

    mm.add('(max-width: 639px)', () => {
      gsap.fromTo(
        cardRef.value,
        {
          width: '100%',
          borderRadius: '0px',
        },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1,
          },
          width: 'calc(100% - 3rem)',
          borderRadius: '2rem',
          ease: 'none',
        },
      )
    })
  }

  // Text Reveal Effect
  if (sectionRef.value) {
    const revealElements = sectionRef.value.querySelectorAll('.reveal-text')

    revealElements.forEach((element) => {
      const split = new SplitType(element, { types: 'words' })

      gsap.set(split.words, {
        color: '#ffffff',
        opacity: 0.25,
        willChange: 'opacity',
      })

      gsap.to(split.words, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 60%',
          scrub: 1.2,
        },
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
      })
    })
  }
})
</script>

<style scoped>
.reveal-text {
  backface-visibility: hidden;
  transform: translateZ(0);
}

.about-title {
  overflow: hidden;
}

.about-title .char {
  display: inline-block;
}
</style>
