<template>
  <section class="landingP relative overflow-hidden flex">
    <div class="w-full px-4 sm:px-6 lg:px-12 relative">
      <!-- HERO TITLE  -->
      <div class="absolute top-12 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <span class="sub-title block text-xl lg:text-4xl font-light mb-[-0.1em]"> Enthusiast </span>

        <div class="overflow-hidden px-3">
          <h1
            class="hero-title font-sofia text-[12vw] lg:text-[16rem] font-[780] leading-[0.75] tracking-[-0.08em]"
          >
            WEB&nbsp;DEVELOPER
          </h1>
        </div>

        <span
          class="sub-title absolute right-0 text-sm lg:text-xl font-light leading-[0.5] tracking-[0.3em] font-semibold"
          >BASED IN YOGYAKARTA</span
        >
      </div>

      <!-- CONTENT CENTER -->
      <div class="relative mt-[10rem] sm:mt-[18rem] lg:mt-[12rem] flex justify-center">
        <div class="flex flex-col lg:flex-row items-end gap-4 lg:gap-8">
          <!-- TEXT -->
          <div
            class="sub-title font-sofia font-bold text-sm sm:text-base md:text-lg lg:text-3xl tracking-[-0.05em] text-center lg:text-left"
          >
            <div>/ WEB DEVELOPMENT</div>
            <div>/ WEB DESIGN (UI/UX)</div>
            <div>/ SENENG NGFOTO</div>
          </div>

          <!-- IMAGE -->
          <div class="habibi-img w-45 sm:w-72 lg:w-80 aspect-[3/4] overflow-hidden">
            <img
              src="/src/assets/img/nuba.jpeg"
              class="w-full h-full object-cover grayscale"
              alt="Habibi"
            />
          </div>
        </div>
      </div>

      <div class="addYap mt-14 lg:mt-18 lg:mb-18">
        <div class="sub-title yap">
          <p class="font-spline font-thin text-center text-sm md:text-md lg:text-lg">
            ORA PERLU PADANG, SEMENTING MURUB
          </p>
          <p class="font-spline font-thin text-center text-sm md:text-md lg:text-lg">
            SERUPUT KOPI lalu MENIKMATI DUNIA INI
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import SplitType from 'split-type'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

onMounted(() => {
  const text = new SplitType('.hero-title', { types: 'chars' })
  const chars = text.chars
  const middle = Math.floor(chars.length / 2)

  const orderedChars = [
    chars[middle],
    ...chars
      .map((_, i) => i)
      .filter((i) => i !== middle)
      .sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle))
      .map((i) => chars[i]),
  ]

  // Hero Title
  gsap.from(orderedChars, {
    y: -120,
    opacity: 0,
    duration: 1.3,
    ease: 'power4.out',
    stagger: 0.09,
  })

  // Sub Title
  gsap.from('.sub-title', {
    y: -30,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.2,
    delay: 2,
  })

  // Image
  gsap.from('.habibi-img', {
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay: 2,
  })
})
</script>
