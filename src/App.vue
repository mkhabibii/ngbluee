<script setup>
import Navbar from './components/Navbar.vue'
import Home from './views/Home.vue'
import Essence from './views/Essence.vue'
import Porto from './views/Porto.vue'
import Credentials from './views/Credentials.vue'
import ContactMe from './views/ContactMe.vue'
import Footer from './components/Footer.vue'
import Lenis from 'lenis'
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/all'

onMounted(() => {
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
  });

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  lenis.on('scroll', ScrollTrigger.update)
})
</script>

<template>
  <Navbar />

  <main>
    <Home id="home" />
    <Essence id="about" />
    <Porto id="projects" />
    <Credentials id="credential" />
    <ContactMe id="contact" />
  </main>

  <Footer />
</template>

<style scoped></style>
