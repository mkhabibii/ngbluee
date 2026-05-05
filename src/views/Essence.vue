<template>
  <!-- Header Contact Links -->
  <div
    class="w-full max-w-7xl mx-auto px-6 lg:px-12 mt-32 md:mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs md:text-lg uppercase tracking-widest z-10 relative"
  >
    <div class="flex flex-col gap-2">
      <span class="font-semibold">Available for collaboration</span>
      <a href="mailto:habiboy0607@gmail.com" class="group flex items-center gap-2">
        <span class="border-b border-gray-700 pb-0.5 group-hover:border-white transition-colors"
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
          class="w-6 h-6 transform rotate-45 group-hover:rotate-0 transition-transform duration-300"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>

    <!-- Right: LinkedIn/Social -->
    <div class="flex flex-col gap-2 md:text-right md:items-end">
      <span class="font-semibold">Recent Work</span>
      <a
        href="https://www.linkedin.com/in/muhammadkhoerulhabibi/"
        class="group flex items-center gap-2"
        target="blank"
      >
        <span class="border-b border-gray-700 pb-0.5 group-hover:border-white transition-colors"
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
          class="w-6 h-6 transform rotate-45 group-hover:rotate-0 transition-transform duration-300"
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
      class="about-title text-center font-bold font-sofia text-[12vw] lg:text-[10rem] tracking-[-0.07em] leading-none"
    >
      ABOUT ME
    </h2>
  </div>

  <!-- Content Area -->
  <section class="about-section w-full max-w-7xl mx-auto px-6 lg:px-12 relative mt-1 lg:mt-12 lg:mb-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      <!-- Bio Content with Scroll Reveal -->
      <div class="bio-content space-y-8">
        <h3
          class="reveal-text text-xl lg:text-4xl font-bold leading-tight text-gray-700 font-manrope"
        >
          I craft digital experiences that blend aesthetics with functionality.
        </h3>

        <p class="reveal-text text-md lg:text-xl leading-relaxed text-gray-800 font-manrope text-justify">
          Based in Yogyakarta, I am a web developer and UI designer dedicated to building intuitive
          and immersive web applications. My journey started with a curiosity for how things work on
          the internet, which quickly evolved into a passion for clean code and pixel-perfect
          design. and immersive web applications. My journey started with a curiosity for how things
          work on the internet, which quickly evolved into a passion for clean code and
          pixel-perfect design.
        </p>
      </div>

      <!-- Skills / Tech Stack -->
      <div class="skills-content">
        <h4
          class="sm:text-sm lg:text-3xl text-center font-bold font-manrope tracking-[0.3em] mb-8 uppercase border-b border-gray-800 pb-2"
        >
          Technical Arsenal
        </h4>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="(skill, index) in skills"
            :key="index"
            class="skill-tag px-4 py-2 border border-black/50 rounded-full sm:text-sm lg:text-base hover:bg-black hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
          >
            {{ skill }}
          </span>
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
  'PHP',
  'Laravel',
  'Vue',
  'Tailwind CSS',
  'Bootstrap',
  'GSAP',
  'Node Js',
  'Figma',
  'UI/UX Design',
  'Git',
  'Postman',
  'MySQL',
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

  // Text Reveal Effect (Dim to Bright)
  const revealElements = document.querySelectorAll('.reveal-text')

  revealElements.forEach((element) => {
    // Split text into characters
    const split = new SplitType(element, { types: 'words, chars' })

    // Set initial state: Dim/Silver
    gsap.set(split.chars, {
      color: '#4b5563', 
      opacity: 0.2,
    })

    // Animate to Bright/White
    gsap.to(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 0.5,
      },
      color: '#000000',
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
    })
  })
})
</script>

<style scoped>
.about-title {
  /* line-height: 1; */
  overflow: hidden;
}

.about-title .char {
  display: inline-block;
}
</style>
