<script setup>
import Navbar from '../components/Navbar.vue'
import Home from './Home.vue'
import Essence from './Essence.vue'
import Porto from './Porto.vue'
import Credentials from './Credentials.vue'
import Footer from '../components/Footer.vue'
import Lenis from 'lenis'
import { onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/all'

let lenisInstance = null

onMounted(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
  })

  lenisInstance = lenis
  window.lenis = lenis

  let isRestoring = true

  const restoreScroll = () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        lenis.scrollTo(target, { immediate: true })
      }
    } else {
      const savedPos = sessionStorage.getItem('scroll_position_y')
      if (savedPos !== null) {
        lenis.scrollTo(Number(savedPos), { immediate: true })
      }
    }
  }

  // Jalankan pemulihan scroll secara instan saat pertama kali mounted
  restoreScroll()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  lenis.on('scroll', (e) => {
    ScrollTrigger.update()
    // Simpan posisi scroll hanya ketika tidak sedang restore
    if (!isRestoring) {
      sessionStorage.setItem('scroll_position_y', e.scroll)
    }
  })

  // Jalankan lagi di frame berikutnya & setelah jeda sangat singkat untuk memastikan kestabilan layout
  requestAnimationFrame(() => {
    restoreScroll()
  })

  setTimeout(() => {
    restoreScroll()
    isRestoring = false
  }, 100) // Cukup 100ms saja untuk antisipasi rendering asinkron awal
})

onUnmounted(() => {
  if (lenisInstance) {
    lenisInstance.destroy()
  }
  window.lenis = null
})
</script>

<template>
  <Navbar />

  <!-- pt-20 ensures content is not hidden behind the fixed navbar -->
  <main class="pt-20">
    <Home id="home" />
    <Essence id="about" />
    <Porto id="showcase" />
    <Credentials id="credential" />
  </main>

  <Footer />
</template>
