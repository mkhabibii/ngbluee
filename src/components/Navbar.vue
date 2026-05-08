<template>
  <header
    ref="navbar"
    :class="[
      'navbar sticky top-0 z-50 transition-all duration-300',
      isScrolled ? 'border-white/5 backdrop-blur backdrop-filter bg-black/20' : 'bg-transparent',
      isDark ? 'text-white' : 'text-black',
    ]"
  >
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between p-4 lg:px-2"
      aria-label="Global"
    >
      <!-- Brand Name -->
      <div class="flex lg:flex-1 font-sofia">
        <a
          href="#"
          class="text-3xl font-extrabold leading-[0.75] tracking-tight hover:text-[#6941C6]"
          :class="isDark ? 'text-white' : 'text-black'"
        >
          <span class="block">MKH.</span>
          <span class="block">HABIBI</span>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex lg:gap-x-20 font-manrope">
        <a href="#about" class="text-lg font-semibold hover:text-[#6941C6] transition">Essence</a>
        <a href="#showcase" class="text-lg font-semibold hover:text-[#6941C6] transition">Showcase</a>
        <a href="#credential" class="text-lg font-semibold hover:text-[#6941C6] transition">Credentials</a>
      </div>

      <!-- Right Side -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4 font-manrope">
        <a
          href="#"
          class="text-md text-black font-bold px-6 py-2 rounded-full border-1 border transition"
          :class="
            isDark
              ? 'text-white border-white hover:bg-white hover:text-black'
              : 'text-black border-black hover:bg-black hover:text-white'
          "
        >
          Get In Touch
        </a>
      </div>

      <!-- Burger Menu Mobile -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Dialog -->
    <TransitionRoot :show="mobileMenuOpen" as="template">
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false">
        <!-- Backdrop -->
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 z-50 bg-black/30" aria-hidden="true"></div>
        </TransitionChild>

        <!-- Panel Slider -->
        <TransitionChild
          as="template"
          enter="transform transition ease-out duration-300"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transform transition ease-in duration-200"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <DialogPanel
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black/20 backdrop-blur-md p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
          >
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="font-sofia text-black hover:text-gray-300 -m-1.5 p-1.5 text-2xl font-extrabold leading-[0.75] tracking-tight"
              >
                <span class="block">MKH.</span>
                <span class="block">HABIBI</span>
              </a>
              <button
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-black hover:text-gray-600"
                @click="mobileMenuOpen = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="size-6" aria-hidden="true" />
              </button>
            </div>

            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-white/10 font-manrope">
                <div class="space-y-2 py-6">
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium hover:bg-black/10 hover:text-white"
                    >Essence</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium hover:bg-black/10 hover:text-white"
                    >Showcase</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium hover:bg-black/10 hover:text-white"
                    >Credentials</a
                  >
                </div>
                <div class="py-6 space-y-4">
                  <a
                    href="#"
                    class="-mx-3 block rounded-full px-6 py-3 text-center text-base/7 font-semibold border-2 border-black hover:bg-black hover:text-white transition"
                    >Get in Touch</a
                  >
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import gsap from 'gsap'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onMounted(() => {
  gsap.from('header', {
    filter: 'opacity(0)',
    duration: 2,
    ease: 'power4.out',
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navbar = ref(null)
const isDark = ref(false)

onMounted(() => {
  const darkZones = document.querySelectorAll('.dark-zone')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isDark.value = true
        } else {
          isDark.value = false
        }
      })
    },
    {
      threshold: 0.3,
    },
  )

  darkZones.forEach((zone) => observer.observe(zone))
})
</script>
