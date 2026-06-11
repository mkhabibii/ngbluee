<template>
  <footer
    class="duten-footer relative w-full bg-black text-white pt-20 md:pt-32 pb-10 overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="noise-overlay absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"></div>

    <div
      class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
      :style="{
        background: `radial-gradient(circle 500px at ${currentX}px ${currentY}px, rgba(255,255,255,0.03), transparent)`,
        opacity: isHovering ? 1 : 0,
      }"
    ></div>

    <div class="w-full dark-zone px-4 sm:px-6 lg:px-12 relative z-10">
      <!-- TOP SECTION -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 mb-6 md:mb-4">
        <!-- Brand & Nav -->
        <div class="lg:col-span-3 space-y-8 md:space-y-12 text-left">
          <div class="font-sofia text-3xl md:text-4xl font-black leading-none tracking-tighter">
            MKH.<br />HABIBI
          </div>
          <ul
            class="grid grid-cols-2 sm:grid-cols-1 gap-4 font-manrope text-xs md:text-base font-bold text-gray-500 uppercase tracking-[0.2em]"
          >
            <li><a href="#home" @click="handleNavClick($event, '#home')" class="hover:text-white transition-colors">Home</a></li>
            <li><a href="#about" @click="handleNavClick($event, '#about')" class="hover:text-white transition-colors">About</a></li>
            <li><a href="#showcase" @click="handleNavClick($event, '#showcase')" class="hover:text-white transition-colors">Showcase</a></li>
            <li>
              <a href="#credential" @click="handleNavClick($event, '#credential')" class="hover:text-white transition-colors">Credentials</a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-3 text-left">
          <p
            class="font-manrope text-[9px] md:text-[14px] uppercase tracking-[0.4em] text-gray-400 mb-6 md:mb-8"
          >
            Contact
          </p>
          <ul class="space-y-3 md:space-y-4 font-manrope text-md font-semibold">
            <li>
              <a
                href="mailto:habiboy0607@gmail.com"
                class="hover:text-gray-400 transition-colors break-all md:break-normal text-white/80"
                >habiboy0607@gmail.com</a
              >
            </li>
            <li class="text-gray-500 font-manrope">+62 895 3850 51731</li>
          </ul>
        </div>

        <!-- Socials -->
        <div class="lg:col-span-2 text-left">
          <p
            class="font-manrope text-[9px] md:text-[14px] uppercase tracking-[0.4em] text-gray-400 mb-6 md:mb-8"
          >
            Social
          </p>
          <ul
            class="flex flex-row sm:flex-col gap-6 sm:gap-4 font-manrope text-[10px] md:text-sm font-semibold uppercase tracking-wider"
          >
            <li>
              <a
                href="https://github.com/habiboy7"
                target="_blank"
                class="hover:text-gray-400 transition-colors"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="https://linkedin.com/in/muhammadkhoerulhabibi"
                target="_blank"
                class="hover:text-gray-400 transition-colors"
                >LinkedIn</a
              >
            </li>
            <li><a href="#" class="hover:text-gray-400 transition-colors">Instagram</a></li>
          </ul>
        </div>

        <!-- Get in Touch -->
        <div class="lg:col-span-4 flex flex-col justify-between items-start lg:items-end">
          <div class="w-full">
            <p
              class="font-manrope text-[9px] md:text-[14px] uppercase tracking-[0.4em] text-gray-400 mb-6 md:mb-10 text-left lg:text-right"
            >
              Get in touch
            </p>
            <div class="relative group">
              <input
                type="email"
                placeholder="Your email address"
                class="w-full bg-transparent border-b border-gray-800 py-3 md:py-4 outline-none font-manrope focus:border-white transition-colors pr-12 text-white text-sm md:text-base"
              />
              <button
                class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-all transform hover:translate-x-1 uppercase text-[9px] md:text-[10px] font-bold tracking-widest flex items-center gap-2"
              >
                Send <span class="text-base md:text-lg">→</span>
              </button>
            </div>
            <p
              class="text-[8px] md:text-[10px] text-gray-400 mt-4 md:mt-6 font-mono uppercase tracking-widest text-left lg:text-right"
            >
              By sending, you agree to our
              <a href="#" class="underline hover:text-white">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      <!-- MIDDLE BIG TEXT -->
      <div
        class="footer-bg-container relative py-6 md:py-6 flex justify-center items-center overflow-visible"
      >
        <!-- Layer Outline -->
        <h2
          class="giant-text font-manrope text-[18vw] lg:text-[26rem] font-black leading-none uppercase tracking-[-0.05em] text-transparent select-none pointer-events-none"
          style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.3)"
        >
          HABIBI
        </h2>

        <h2
          ref="fillText"
          class="footer-bg-text--fill absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center font-manrope text-[18vw] lg:text-[26rem] font-black leading-none uppercase tracking-[-0.05em] text-white select-none pointer-events-none opacity-0"
          style="clip-path: circle(0px at 50% 50%); -webkit-clip-path: circle(0px at 50% 50%)"
        >
          HABIBI
        </h2>
      </div>

      <!-- BOTTOM BAR -->
      <div
        class="flex flex-col md:flex-row justify-between items-center mt-10 md:mt-10 pt-8 md:pt-10 border-t border-gray-900 gap-6 md:gap-4"
      >
        <div
          class="font-manrope text-[8px] md:text-[14px] text-gray-400 text-center md:text-left order-2 md:order-1"
        >
          © 2026 Muhammad Khoerul Habibi
        </div>
        <div
          class="font-manrope text-[8px] md:text-[14px] text-gray-400 text-center order-1 md:order-2"
        >
          Web Developer • Yogyakarta, Indonesia
        </div>
        <div class="font-manrope text-[8px] md:text-[14px] text-gray-400 order-3">v.02</div>
      </div>
    </div>

    <!-- SPOTLIGHT DOT -->
    <div
      ref="spotlight"
      class="footer-spotlight hidden lg:block absolute w-3 h-3 bg-white rounded-full pointer-events-none shadow-[0_0_25px_rgba(255,255,255,1)] z-20"
      :style="{
        left: `${currentX}px`,
        top: `${currentY}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isHovering ? 1 : 0,
      }"
    ></div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const handleNavClick = (e, href) => {
  if (window.lenis && href.startsWith('#')) {
    e.preventDefault()
    window.lenis.scrollTo(href)
    history.pushState(null, null, href)
  }
}

// State
const fillText = ref(null)
const isHovering = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const currentX = ref(0)
const currentY = ref(0)

let velocityX = 0
let velocityY = 0
const stiffness = 0.15
const damping = 0.8
const spotlightRadius = 220

let bgOffsetX = 0
let bgOffsetY = 0

const updateOffset = () => {
  const footer = document.querySelector('.duten-footer')
  const bgContainer = document.querySelector('.footer-bg-container')
  if (footer && bgContainer) {
    const footerRect = footer.getBoundingClientRect()
    const bgRect = bgContainer.getBoundingClientRect()
    bgOffsetX = bgRect.left - footerRect.left
    bgOffsetY = bgRect.top - footerRect.top
  }
}

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const handleMouseEnter = (e) => {
  isHovering.value = true
  updateOffset()
  const rect = e.currentTarget.getBoundingClientRect()
  const startX = e.clientX - rect.left
  const startY = e.clientY - rect.top
  currentX.value = startX
  currentY.value = startY
  mouseX.value = startX
  mouseY.value = startY
  velocityX = 0
  velocityY = 0
  gsap.to(fillText.value, { opacity: 1, duration: 0.4 })
}

const handleMouseLeave = () => {
  isHovering.value = false
  gsap.to(fillText.value, { clipPath: 'circle(0px at 50% 50%)', opacity: 0, duration: 0.6 })
}

onMounted(() => {
  updateOffset()
  window.addEventListener('resize', updateOffset)

  gsap.ticker.add(() => {
    if (!isHovering.value && Math.abs(velocityX) < 0.1) return

    const dx = mouseX.value - currentX.value
    const dy = mouseY.value - currentY.value

    velocityX += dx * stiffness
    velocityY += dy * stiffness
    velocityX *= damping
    velocityY *= damping

    currentX.value += velocityX
    currentY.value += velocityY

    if (fillText.value && isHovering.value) {
      const relativeX = currentX.value - bgOffsetX
      const relativeY = currentY.value - bgOffsetY

      const clipValue = `circle(${spotlightRadius}px at ${relativeX}px ${relativeY}px)`
      fillText.value.style.clipPath = clipValue
      fillText.value.style.webkitClipPath = clipValue
    }
  })
})
</script>

<style scoped>
.noise-overlay {
  background-image: url('https://grainy-gradients.vercel.app/noise.svg');
}
input::placeholder {
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 11px;
}
@media (max-width: 640px) {
  .giant-text {
    -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.15);
  }
}
</style>
