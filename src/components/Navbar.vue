<template>
  <header ref="navbar" style="opacity: 0" class="navbar fixed top-0 left-0 right-0 z-50">
    <nav class="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4" aria-label="Global">
      <!-- Brand Name Placeholder -->
      <div class="flex lg:flex-1 font-sofia" />

      <!-- Menu Button -->
      <button
        ref="menuBtn"
        type="button"
        class="menu-btn flex items-center gap-2 rounded-full border px-5 py-2.5 font-manrope text-base font-semibold cursor-pointer"
        :class="isDark ? 'bg-white text-black' : 'bg-black text-white'"
        @click="openMenu"
      >
        Menu
        <span class="inline-block w-2 h-2 rounded-full" :class="isDark ? 'bg-black' : 'bg-white'" />
      </button>
    </nav>

    <!-- Backdrop overlay -->
    <div
      ref="overlay"
      class="fixed inset-0 z-[60] pointer-events-none"
      style="
        opacity: 0;
        background: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      "
      @click="closeMenu"
    />

    <div
      ref="panel"
      class="menu-panel fixed z-[70] flex flex-col overflow-hidden"
      :class="isDark ? 'bg-[#f5f4f0]' : 'bg-[#111]'"
      style="
        top: 12px;
        right: 12px;
        width: 0px;
        height: 0px;
        border-radius: 20px;
        pointer-events: none;
        clip-path: circle(0px at 50% 50%);
      "
    >
      <!-- Inner content, fades in after panel is revealed -->
      <div ref="panelInner" class="flex flex-col h-full" style="opacity: 0">
        <!-- Close Button -->
        <div class="flex justify-end p-6 pb-2">
          <button
            type="button"
            class="flex items-center gap-2 font-manrope text-sm font-medium transition-opacity hover:opacity-60 cursor-pointer"
            :class="isDark ? 'text-black' : 'text-white'"
            @click="closeMenu"
          >
            Close
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full text-sm"
              :class="isDark ? 'bg-black text-white' : 'bg-white text-black'"
              >✕</span
            >
          </button>
        </div>

        <!-- Nav Links -->
        <nav class="flex flex-1 flex-col justify-center gap-0 px-8 font-manrope">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            ref="navLinks"
            class="block text-[3rem] sm:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.15] tracking-tight transition-colors"
            :class="
              isDark ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-400'
            "
            @click="handleNavClick($event, item.href)"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Footer -->
        <div
          class="flex items-center justify-between border-t px-8 py-5 font-manrope"
          :class="isDark ? 'border-black/10' : 'border-white/10'"
        >
          <span class="text-base" :class="isDark ? 'text-neutral-600' : 'text-neutral-400'"
            >habiboy0607@gmail.com</span
          >
          <div class="flex gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              class="flex h-9 w-9 items-center justify-center rounded-full transition-colors overflow-hidden"
              :class="
                isDark
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-200'
              "
            >
              <img
                :src="s.icon"
                :alt="s.label"
                class="w-5 h-5 object-contain"
                :class="isDark ? 'invert' : ''"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Brand Name -->
  <div
    ref="brandName"
    style="opacity: 0"
    class="fixed top-4 left-4 sm:left-6 lg:left-10 z-50 font-sofia mix-blend-difference pointer-events-none"
  >
    <a
      href="#"
      class="pointer-events-auto text-3xl lg:text-4xl font-extrabold leading-[0.75] tracking-tight text-white"
      @click="handleBrandClick"
    >
      <span class="block scramble-brand">MKH.</span>
      <span class="block scramble-brand">HABIBI</span>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import githubIcon from '@/assets/img/github.png'
import linkedinIcon from '@/assets/img/linkedin.png'
import instagramIcon from '@/assets/img/instagram.png'
import { Howl } from 'howler'

const menuOpenSfx = '/sounds/open.mp3'
const menuCloseSfx = '/sounds/close.mp3'

const openSound = new Howl({
  src: [menuOpenSfx],
  volume: 0.5,
  preload: true,
})

const closeSound = new Howl({
  src: [menuCloseSfx],
  volume: 0.5,
  preload: true,
})

const playSound = (type) => {
  type === 'open' ? openSound.play() : closeSound.play()
}

const handleNavClick = (e, href) => {
  closeMenu(false)
  if (href.startsWith('#')) {
    if (window.location.pathname !== '/') {
      e.preventDefault()
      window.location.href = '/' + href
    } else if (window.lenis) {
      e.preventDefault()
      window.lenis.scrollTo(href)
      history.pushState(null, null, href)
    }
  }
}

const handleBrandClick = (e) => {
  if (window.lenis) {
    e.preventDefault()
    window.lenis.scrollTo(0)
    history.pushState(null, null, '/')
  }
}

const navbar = ref(null)
const brandName = ref(null)

const scrambleText = (el, duration = 0.8) => {
  if (el._scrambleTween) {
    el._scrambleTween.kill()
  }

  if (!el.dataset.originalText) {
    el.dataset.originalText = el.textContent.trim()
  }

  const targetText = el.dataset.originalText
  const chars = 'ABCD#@%%^&*#@#%*&NOPQRSTUVWXYZ0123456789/#%&&*(@-+)'
  const length = targetText.length
  const obj = { val: 0 }

  el._scrambleTween = gsap.to(obj, {
    val: 1,
    duration: duration,
    ease: 'power1.inOut',
    onUpdate: () => {
      let currentText = ''
      for (let i = 0; i < length; i++) {
        if (targetText[i] === ' ' || targetText[i] === '.') {
          currentText += targetText[i]
        } else {
          const progress = obj.val
          const threshold = i / length
          if (progress > threshold) {
            currentText += targetText[i]
          } else {
            currentText += chars[Math.floor(Math.random() * chars.length)]
          }
        }
      }
      el.textContent = currentText
    },
    onComplete: () => {
      el.textContent = targetText
      el._scrambleTween = null
    },
  })
}

const menuBtn = ref(null)
const panel = ref(null)
const panelInner = ref(null)
const overlay = ref(null)
const navLinks = ref([])
const isOpen = ref(false)
const isScrolled = ref(false)
const isDark = ref(false)

const navItems = [
  { href: '#about', label: 'Essence' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#credential', label: 'Credentials' },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/habiboy7',
    icon: githubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammadkhoerulhabibi',
    icon: linkedinIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mkhabibii_',
    icon: instagramIcon,
  },
]

// Responsive target panel size
const getPanelSize = () => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (vw >= 1024) return { w: 420, h: 520 }
  if (vw >= 640) return { w: Math.min(400, vw - 24), h: 500 }
  return { w: vw - 24, h: Math.min(560, vh - 24) }
}

/**
 * Calculate the button center relative to the panel's top-left corner.
 * Panel is fixed at top: 12, right: 12.
 * This gives us the exact clip-path origin point.
 */
const getOrigin = (w) => {
  const btnRect = menuBtn.value.getBoundingClientRect()
  const panelLeft = window.innerWidth - 12 - w
  const panelTop = 12

  const originX = btnRect.left + btnRect.width / 2 - panelLeft
  const originY = btnRect.top + btnRect.height / 2 - panelTop
  return { originX, originY }
}

/**
 * Compute the minimum circle radius that fully covers the panel
 * when centered at (originX, originY).
 */
const getMaxRadius = (w, h, originX, originY) => {
  return (
    Math.ceil(
      Math.max(
        Math.hypot(originX, originY),
        Math.hypot(w - originX, originY),
        Math.hypot(originX, h - originY),
        Math.hypot(w - originX, h - originY),
      ),
    ) + 10
  )
}

const openMenu = () => {
  if (isOpen.value) return
  isOpen.value = true
  playSound('open')

  const { w, h } = getPanelSize()
  const { originX, originY } = getOrigin(w)
  const maxR = getMaxRadius(w, h, originX, originY)

  // Fade out brand name when menu opens
  if (brandName.value) {
    gsap.to(brandName.value, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  // Set panel to its final size/position, collapsed to a circle at button center
  gsap.set(panel.value, {
    width: w,
    height: h,
    clipPath: `circle(0px at ${originX}px ${originY}px)`,
  })

  // Button pulse
  gsap
    .timeline()
    .to(menuBtn.value, { scale: 1.1, duration: 0.18, ease: 'power2.out' })
    .to(menuBtn.value, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })

  // Overlay
  gsap.to(overlay.value, {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.out',
    onStart: () => {
      overlay.value.style.pointerEvents = 'auto'
    },
  })

  // Reveal panel via clip-path circle growing from button center
  gsap.to(panel.value, {
    clipPath: `circle(${maxR}px at ${originX}px ${originY}px)`,
    duration: 0.65,
    ease: 'power4.inOut',
    onStart: () => {
      panel.value.style.pointerEvents = 'auto'
    },
    onComplete: () => {
      // Fade in inner content after reveal
      gsap.to(panelInner.value, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      gsap.fromTo(
        navLinks.value,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' },
      )
    },
  })
}

const closeMenu = () => {
  if (!isOpen.value) return
  isOpen.value = false
  playSound('close')

  const { w, h } = getPanelSize()
  const { originX, originY } = getOrigin(w)

  // Fade in brand name when menu closes
  if (brandName.value) {
    gsap.to(brandName.value, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.15,
    })
  }

  // Button bounce
  gsap
    .timeline()
    .to(menuBtn.value, { scale: 0.9, duration: 0.15, ease: 'power2.in' })
    .to(menuBtn.value, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' })

  // Fade overlay
  gsap.to(overlay.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      overlay.value.style.pointerEvents = 'none'
    },
  })

  // Fade out content
  gsap.to(panelInner.value, {
    opacity: 0,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(panel.value, {
        clipPath: `circle(0px at ${originX}px ${originY}px)`,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          panel.value.style.pointerEvents = 'none'
          gsap.set(panel.value, { width: 0, height: 0, clipPath: 'circle(0px at 50% 50%)' })
        },
      })
    },
  })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  gsap.to([navbar.value, brandName.value], {
    opacity: 1,
    duration: 1.5,
    delay: 2,
    ease: 'power4.out',
  })

  // Brand name hover scramble
  if (brandName.value) {
    const brandLink = brandName.value.querySelector('a')
    if (brandLink) {
      const spans = brandLink.querySelectorAll('.scramble-brand')
      brandLink.addEventListener('mouseenter', () => {
        spans.forEach((span) => scrambleText(span, 0.8))
      })
    }
  }

  // Dark zone observer
  const darkZones = document.querySelectorAll('.dark-zone')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isDark.value = entry.isIntersecting
      })
    },
    { threshold: 0.3 },
  )
  darkZones.forEach((zone) => observer.observe(zone))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  background: transparent;
}

.menu-btn {
  will-change: transform;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}

.menu-panel {
  will-change: clip-path;
}
</style>
