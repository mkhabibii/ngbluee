<template>
  <section
    class="contact-section relative w-full bg-neutral-900 text-white py-32 overflow-hidden min-h-screen flex flex-col justify-center"
  >
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
      <div class="flex flex-col lg:flex-row gap-20">
        <!-- Left: Call to Action -->
        <div class="lg:w-1/2">
          <p class="text-sm font-mono text-gray-400 mb-6 flex items-center gap-4">
            <span class="w-12 h-[1px] bg-gray-600"></span>
            SAY HELLO
          </p>
          <h2 class="font-sofia text-6xl lg:text-8xl font-bold leading-tight mb-8">
            LET'S WORK <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
              >TOGETHER</span
            >
          </h2>
          <p class="text-gray-400 text-lg leading-relaxed max-w-md mb-12">
            Have a project in mind? Looking for a partner to build your next big idea? Let's create
            something extraordinary.
          </p>
          <div class="contact-info space-y-4">
            <a
              href="mailto:hello@example.com"
              class="block text-2xl hover:text-purple-400 transition-colors duration-300"
            >
              hello@example.com
            </a>
            <a
              href="tel:+6281234567890"
              class="block text-xl text-gray-400 hover:text-white transition-colors duration-300"
            >
              +62 812 3456 7890
            </a>
          </div>

          <div class="socials flex gap-6 mt-12">
            <a
              href="#"
              class="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <span class="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="#"
              class="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <span class="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                ></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="#"
              class="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <span class="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div
          class="lg:w-1/2 bg-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-white/10 form-container opacity-0 translate-y-20"
        >
          <form @submit.prevent class="space-y-8">
            <div class="form-group">
              <label class="block text-sm font-mono text-gray-400 mb-2">NAME</label>
              <input
                type="text"
                class="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 transition-colors focus:outline-none text-xl"
                placeholder="John Doe"
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-mono text-gray-400 mb-2">EMAIL</label>
              <input
                type="email"
                class="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 transition-colors focus:outline-none text-xl"
                placeholder="john@example.com"
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-mono text-gray-400 mb-2">MESSAGE</label>
              <textarea
                rows="4"
                class="w-full bg-transparent border-b border-gray-700 py-3 focus:border-purple-500 transition-colors focus:outline-none text-xl resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-white text-black font-bold py-4 rounded hover:bg-purple-500 hover:text-white transition-all duration-300 tracking-widest text-sm uppercase"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.to('.form-container', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 60%',
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
  })
})
</script>
