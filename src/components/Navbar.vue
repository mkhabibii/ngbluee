<script setup>
</script>

<template>
  <!-- SELALU BUNGKUS DENGAN SATU DIV INDUK -->
  <div>
    <h1>ini navbar</h1>
    <nav class="navbar">
      <div class="logo">Habiboy7</div>
      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#about">Tentang</a>
        <a href="#skills">Skill Set</a>
        <a href="#projects">Projects</a>
        <a href="#gallery">Galeri</a>
        <a href="#credential">Credential</a>
        <a href="#contact">Kontak</a>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #412626;
  position: sticky;
  top: 0;
  z-index: 1000;
  color: white; /* Tambahkan warna teks agar terlihat */
}

/* Tambahkan sedikit styling untuk link agar terlihat */
.nav-links a {
  margin-left: 1rem;
  text-decoration: none;
  color: #fff;
}
</style>
