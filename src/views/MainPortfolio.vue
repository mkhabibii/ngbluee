<script setup>
import Navbar from '../components/Navbar.vue'
import Home from './Home.vue'
import Essence from './Essence.vue'
import Porto from './Porto.vue'
import Credentials from './Credentials.vue'
import ContactMe from './ContactMe.vue'
import Footer from '../components/Footer.vue'
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
