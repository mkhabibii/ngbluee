<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false) 

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-black/50 border-white/5 backdrop-blur border-b backdrop-filter ' 
        : 'bg-black', 
    ]"
  >
    <nav
      class="mx-auto flex max-w-5xl items-center justify-between p-5 lg:px-8"
      aria-label="Global"
    >
      <!-- Brand Name -->
      <div class="flex lg:flex-1">
        <a href="#" class="text-xl font-bold tracking-widest text-white">HABIBOY7</a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex lg:gap-x-8">
        <a href="#" class="text-lg font-medium text-gray-300 hover:text-white transition"
          >Essence</a
        >
        <a href="#" class="text-lg font-medium text-gray-300 hover:text-white transition"
          >Toolkit</a
        >
        <a href="#" class="text-lg font-medium text-gray-300 hover:text-white transition"
          >Showcase</a
        >
        <a href="#" class="text-lg font-medium text-gray-300 hover:text-white transition"
          >Exhibit</a
        >
        <a href="#" class="text-lg font-medium text-gray-300 hover:text-white transition"
          >Credentials</a
        >
      </div>

      <!-- Right Side -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
        <a
          href="#"
          class="text-sm font-semibold text-white px-6 py-2 rounded-full border-1 border-white hover:bg-white hover:text-black transition"
        >
          Get In Touch
        </a>
      </div>

      <!-- Burger Menu Mobile -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Dialog -->
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50 bg-black/50"></div>
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="text-xl font-bold tracking-widest text-white">HABIBOY7</span>
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-white/10">
            <div class="space-y-2 py-6">
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >Essence</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >Toolkit</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >Showcase</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >Exhibit</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >Credentials</a
              >
            </div>
            <div class="py-6 space-y-4">
              <a
                href="#"
                class="-mx-3 block rounded-full px-6 py-3 text-center text-base/7 font-semibold text-white border-2 border-white hover:bg-white hover:text-black transition"
                >Get in Touch</a
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
