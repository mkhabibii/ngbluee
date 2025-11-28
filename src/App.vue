<script setup>
import Navbar from './components/Navbar.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Skillset from './views/Skillset.vue'
import Porto from './views/Porto.vue'
import Galeri from './views/Galeri.vue'
import Credentials from './views/Credentials.vue'
import ContactMe from './views/ContactMe.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />

  <main>
    <Home id="home" />
    <About id="about" />
    <Skillset id="skills" />
    <Porto id="projects" />
    <Galeri id="gallery" />
    <Credentials id="credential" />
    <ContactMe id="contact" />
  </main>

  <Footer />
</template>

<style scoped></style>
