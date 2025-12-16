<template>
  <div class="title mt-30">
    <h2 ref="aboutTitle" class="about-title text-center font-bold font-sofia text-[12vw] lg:text-[14rem]  tracking-[-0.07em]">ABOUT ME</h2>
  </div>
  <section id="about" class="about-section min-h-screen">
    <div class="dark-zone container-about">
      <h1>Essence</h1>
      <p>
        Welcome to my portfolio! I'm passionate about crafting beautiful and functional web
        experiences. Explore my projects and skills below.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const title = new SplitType('.about-title', {
    types: 'chars',
  })

  // POSISI AWAL → SEMUA HURUF DI ATAS (TERSEMBUNYI)
  gsap.set(title.chars, {
    yPercent: -120,
    opacity: 0,
  })

  // SATU TIMELINE (AUTO REVERSE)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        end: 'top 30%',
        scrub: 0.8,
      },
    })
    .to(title.chars, {
      yPercent: 0,
      opacity: 1,
      ease: 'power4.out',
      stagger: {
        each: 0.09,
        from: 'center',
      },
    })
})
</script>

<style scoped>
.about-title {
  line-height: 1;
  overflow: hidden;
}

.about-title .char {
  display: inline-block;
}

.about-section {
  padding: 80px 50px;
  background-color: aqua;
}
</style>
