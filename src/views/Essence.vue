<template>
  <div
    class="w-full max-w-7xl mx-auto px-6 lg:px-12 mt-12 md:mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative"
    id="about"
  >
    <!-- Email -->
    <div class="flex flex-col gap-2">
      <span class="font-spline text-xs md:text-lg lg:text-xl font-light uppercase"
        >Available for collaboration</span
      >
      <a
        href="https://mailto:habiboy0607@gmail.com"
        target="blank"
        class="group flex items-center gap-2"
      >
        <span
          class="font-sofia leading-[0.75] text-sm md:text-md lg:text-3xl font-bold border-b-3 border-black hover:text-gray-500 group-hover:border-white transition-colors"
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
          class="w-3 w-3 md:w-6 md:h-6 transform rotate-95 group-hover:rotate-45 transition-transform duration-300"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>

    <!-- Linkedin -->
    <div class="flex flex-col gap-2 md:text-right md:items-end">
      <span
        class="font-spline text-xs md:text-lg lg:text-xl font-light uppercase tracking-[-0.07em]"
        >The Link Up</span
      >
      <a
        href="https://www.linkedin.com/in/muhammadkhoerulhabibi/"
        target="blank"
        class="group flex items-center gap-2 md:flex-row-reverse"
      >
        <span
          class="font-sofia leading-[0.75] text-sm md:text-md lg:text-3xl font-bold border-b-3 border-black hover:text-gray-500 group-hover:border-white transition-colors duration-300"
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
          class="w-3 w-3 md:w-6 md:h-6 transform rotate-95 group-hover:rotate-45 transition-transform duration-300"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>
  </div>

  <!-- Main Title Area -->
  <div class="title mt-12 sm:mt-16 lg:mt-20 mb-1">
    <h2
      ref="aboutTitle"
      class="about-title text-center font-bold font-sofia text-[12vw] lg:text-[14rem] tracking-[-0.07em] leading-none"
    >
      ABOUT ME
    </h2>
  </div>

  <section class="about-section  bg-black relative w-full py-12 lg:py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 ">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ">
        <div class="bio-content space-y-8 reveal-text lg:space-y-8 ">
          <h3 class="font-manrope text-3xl lg:text-5xl font-bold leading-tight tracking-[-0.06em]">
            Hi, I'm Muhammad Khoerul Habibi
          </h3>

          <p class="font-spline text-xl lg:text-2xl font-medium leading-snug text-justify">
            "For me, Design is not just decoration, but a tool for influence and growth"
          </p>

          <p class="text-base font-manrope text-justify lg:text-lg leading-relaxed text-gray-300">
            A web developer and UI designer based in Yogyakarta, dedicated to building intuitive and
            immersive web applications. My journey started with curiosity for how things work on the
            internet, which quickly evolved into a passion for clean code and pixel-perfect design.
            I love simple interfaces with deep meaning - As well as simple things that bring true
            pleasure
          </p>
        </div>

        <div class="skills-content lg:pt-2 ">
          <h4
            class="text-sm md:text-lg lg:text-5xl font-sofia font-extrabold text-white mb-6 "
          >
            Things I Code With
          </h4>

          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="(skill, index) in skills"
              :key="index"
              class="skill-tag group relative px-5 py-2 border border-gray-700 rounded-full text-md text-gray-300 hover:border-white hover:text-white transition-all duration-300 cursor-default overflow-hidden"
            >
              <span class="relative z-10">{{ skill }}</span>
              <span
                class="shimmer absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
              ></span>
            </span>
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

const skills = ref([
  'Laravel',
  'Vue Js',
  'Bootstrap',
  'Tailwind CSS',
  'GSAP',
  'Node.js',
  'Figma',
  'UI/UX Design',
  'Git',
  'Vite',
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
        scrub: 0.6,
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

  const revealElements = document.querySelectorAll('.reveal-text')

  revealElements.forEach((element) => {
    const split = new SplitType(element, { types: 'chars' })

    gsap.set(split.chars, {
      color: '#373737',
      opacity: 0.8,
    })

    gsap.to(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 0.5,
      },
      color: '#fff',
      opacity: 1,
      stagger: 0.02,
      ease: 'none',
    })
  })

  gsap.set('.skill-tag', {
    opacity: 0,
    y: 20,
  })

  gsap.to('.skill-tag', {
    scrollTrigger: {
      trigger: '.skills-content',
      start: 'top 85%',
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: 'back.out(1.5)',
  })
})
</script>

<style scoped>
.about-title {
  overflow: hidden;
}

.about-title .char {
  display: inline-block;
}

.skill-tag {
  position: relative;
}

.shimmer {
  pointer-events: none;
}
</style>
