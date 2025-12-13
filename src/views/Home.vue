<template>
  <section class="relative min-h-screen overflow-hidden flex">
    <div class="w-full max-w-7xl mx-auto px-6 lg:px-12 relative">
      <!-- HERO TITLE  -->
      <div class="absolute top-12 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <span class="block text-xl lg:text-4xl font-light mb-[-0.1em]"> Enthusiast </span>

        <h1
          class="font-sofia text-[12vw] lg:text-[14rem] font-extrabold leading-[0.75] tracking-[-0.08em]"
        >
          WEB&nbsp;DEVELOPER
        </h1>

        <span
          class="absolute right-0 text-sm lg:text-xl font-light leading-[0.5] tracking-[0.3em] font-semibold"
          >BASED IN YOGYAKARTA</span
        >
      </div>

      <!-- CONTENT CENTER GROUP -->
      <div class="relative mt-[10rem] sm:mt-[18rem] lg:mt-[12rem] flex justify-center">
        <div class="flex flex-col lg:flex-row items-end gap-4 lg:gap-8">
          <!-- TEXT -->
          <div class="font-sofia font-bold text-2xl tracking-[-0.05em] text-center lg:text-left">
            <div>/ WEB DEVELOPMENT</div>
            <div>/ WEB DESIGN (UX/UI)</div>
            <div>/ SENENG NGFOTO</div>
          </div>

          <!-- IMAGE -->
          <div class="w-45 sm:w-72 lg:w-80 aspect-[3/4] overflow-hidden">
            <img
              src="/src/assets/img/nuba.jpeg"
              class="w-full h-full object-cover grayscale"
              alt="Habibi"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
