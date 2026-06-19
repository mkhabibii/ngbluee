<template>
  <div class="min-h-screen bg-black text-white font-manrope flex flex-col">
    <!-- Top Bar -->
    <header class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-10 flex items-center justify-between z-10">
      <button 
        @click="goBack"
        class="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-base font-bold tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2.5" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="transform group-hover:-translate-x-1.5 transition-transform"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back</span>
      </button>

      <div class="font-sofia sm:text-xs lg:text-3xl font-bold uppercase tracking-tight">
        Archive
      </div>
    </header>

    <!-- Main Container -->
    <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24 pt-6">
      <!-- Title -->
      <div class="mb-12 overflow-hidden title-wrap">
        <h1 class="projects-headline font-extrabold font-sofia text-[10vw] sm:text-[7vw] lg:text-[6rem] tracking-[-0.07em] leading-none text-white uppercase">
          ALL PROJECT
        </h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center gap-4 py-20 text-neutral-400">
        <svg class="animate-spin h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-sm font-bold tracking-widest uppercase">Fetching Archive...</span>
      </div>

      <!-- Bento Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr bento-grid">
        <div 
          v-for="(project, index) in displayProjects"
          :key="project.id"
          @click="goToDetail(project.id)"
          class="bento-card group relative overflow-hidden rounded-[5px] border border-white/20 bg-[#0a0a0a] flex flex-col justify-between p-6 sm:p-8 cursor-pointer select-none transition-all duration-500 hover:border-white/30"
          :class="getBentoClasses(index)"
        >
          <!-- Hover Background Image (revealed on hover) -->
          <div class="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-750 ease-out scale-108 group-hover:scale-100 overflow-hidden pointer-events-none">
            <img 
              :src="project.image_url" 
              class="w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.55] transition-all duration-750" 
              alt="Project Cover" 
            />
            <!-- Vignette overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/50"></div>
          </div>

          <!-- Card Header (Category and Year) -->
          <div class="relative z-10 flex justify-between items-start">
            <span class="text-[9px] lg:text-base font-bold font-manrope uppercase tracking-tight text-emerald-500 bg-emerald-950/20 px-4 py-1 rounded-full border border-emerald-500/25 backdrop-blur-sm">
              {{ project.category }}
            </span>
            <span class="text-[11px] lg:text-sm font-semibold text-neutral-500 group-hover:text-neutral-300 transition-colors">
              {{ project.year }}
            </span>
          </div>

          <!-- Card Footer (Title and Tech tag pills) -->
          <div class="relative z-10 mt-auto pt-12">
            <h2 class="font-sofia font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tighter leading-none mb-4 group-hover:translate-x-1 transition-transform duration-300">
              {{ project.title }}
            </h2>
            
            <div class="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <span 
                v-for="(techItem, tIdx) in getTech(project)" 
                :key="tIdx"
                class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white border border-neutral-800/80 group-hover:border-white/25 bg-neutral-950/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all"
              >
                {{ techItem }}
              </span>
            </div>
          </div>
          
          <!-- Subtle Inner Reflection Frame -->
          <div class="absolute inset-0 border border-white/5 pointer-events-none rounded-[28px]"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import gsap from 'gsap'

const router = useRouter()
const loading = ref(true)
const allProjects = ref([])

// Predefined Mock Projects 
const mockProjects = [
  {
    id: 'mock-1',
    title: 'Web Design',
    category: 'Web',
    tagline: 'Premium custom web designs focused on immersive storytelling and aesthetic typography.',
    description: 'A deep dive into high-end web layout engineering, visual typography hierarchy, and precise alignment. We crafted an immersive narrative experience that tells the brand story through elegant interactions, fluid animations, and custom UI design tokens.',
    role: 'Lead Web Designer',
    year: '2025',
    tech: ['Figma', 'HTML5', 'CSS Grid', 'GSAP', 'Typography.js'],
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mock-2',
    title: 'UI/UX Design',
    category: 'UI/UX',
    tagline: 'User-centered wireframes, mockups and interactive user flows built for modern apps.',
    description: 'Designed from research to production, this app interfaces high-complexity user flows with a clean, grid-aligned layout. Includes a comprehensive Figma library setup, visual design guides, usability reports, and a dark-mode optimized design token schema.',
    role: 'UI/UX Researcher & Designer',
    year: '2025',
    tech: ['Figma', 'FigJam', 'Prototyping', 'Usability Testing'],
    image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mock-3',
    title: 'Creative Design',
    category: 'UI/UX',
    tagline: 'Crafting brand assets, layouts, and unique visual elements for high-impact presence.',
    description: 'Visual identity construction for modern digital-native brands. We established unique art directions, custom packaging elements, responsive typography libraries, and unified vector guidelines to provide an unforgettable presence across web, mobile, print, and retail.',
    role: 'Art Director',
    year: '2025',
    tech: ['Adobe Illustrator', 'Photoshop', 'Indesign', 'Branding'],
    image_url: 'https://images.unsplash.com/photo-1541462608141-2ff580dd0e4e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mock-4',
    title: 'Product & App Design',
    category: 'Mobile',
    tagline: 'Product and app design focused on simplicity, consistency, and growth – crafted to deliver the best digital solutions.',
    description: 'A mobile product design system optimized for iOS and Android platforms. Built with heavy focus on clean, human-centered UI patterns, consistent spacing rules, native behavior adaptations, and high-performance animation guidelines.',
    role: 'Senior Product Designer',
    year: '2025',
    tech: ['Figma', 'SwiftUI Mockups', 'Human Interface Guidelines', 'Material 3'],
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mock-5',
    title: 'Development',
    category: 'Web',
    tagline: 'Responsive and robust coding solutions utilizing modern frameworks and performance-tuned APIs.',
    description: 'Clean-code software development integrating Vue 3 composition API with custom backend nodes. High-performance, search engine optimized architecture utilizing modern build tools and lightweight animations to deliver near-instant load speeds.',
    role: 'Lead Developer',
    year: '2025',
    tech: ['Vue 3', 'Vite', 'Tailwind CSS', 'Supabase', 'Node.js'],
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'
  }
]

// Fetch projects from Supabase
const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    allProjects.value = data || []
  } catch (err) {
    console.error('Error fetching archive projects:', err)
  } finally {
    loading.value = false
    nextTick(() => {
      animateEntrance()
    })
  }
}

// Combine database projects and mock projects 
const displayProjects = computed(() => {
  const list = [...allProjects.value]
  
  // Append mock projects 
  mockProjects.forEach((mock) => {
    const isRepresented = list.some((p) => p.title.toLowerCase() === mock.title.toLowerCase())
    if (!isRepresented) {
      list.push(mock)
    }
  })
  
  return list
})

// Safe tech tag extractor
const getTech = (project) => {
  if (project.tech && Array.isArray(project.tech)) {
    return project.tech.filter((t) => t && t.trim() !== '').slice(0, 3)
  }
  return ['Vue', 'Design', 'Development']
}

// Generate dynamic bento classes 
const getBentoClasses = (index) => {
  const patterns = [
    'lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-[440px]', // Large card
    'lg:col-span-1 lg:row-span-1 min-h-[200px]',
    'lg:col-span-1 lg:row-span-2 min-h-[300px] lg:min-h-[440px]', // Tall card
    'lg:col-span-2 lg:row-span-1 min-h-[200px]',                 // Wide card
    'lg:col-span-1 lg:row-span-1 min-h-[200px]',
    'lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-[440px]', // Large card
    'lg:col-span-1 lg:row-span-1 min-h-[200px]',
    'lg:col-span-1 lg:row-span-1 min-h-[200px]',
    'lg:col-span-2 lg:row-span-1 min-h-[200px]'                  // Wide card
  ]
  return patterns[index % patterns.length]
}

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const getSlug = (project) => {
  if (project.id && project.id.startsWith('mock-')) {
    const slugMap = {
      'mock-1': 'web-design',
      'mock-2': 'ui-ux-design',
      'mock-3': 'creative-design',
      'mock-4': 'product-app-design',
      'mock-5': 'development'
    }
    return slugMap[project.id] || project.id
  }
  return slugify(project.title)
}

// Navigation detail click
const goToDetail = (id) => {
  const projectItem = displayProjects.value.find((p) => p.id === id)
  if (projectItem) {
    router.push(`/project/${getSlug(projectItem)}`)
  } else {
    router.push(`/project/${id}`)
  }
}

// Back button handler
const goBack = () => {
  router.push('/')
}

// GSAP animations for entering the page
const animateEntrance = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Headline animation
  tl.fromTo(
    '.projects-headline',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    0.1
  )

  // Bento cards stagger reveal
  const cards = document.querySelectorAll('.bento-card')
  if (cards.length > 0) {
    tl.fromTo(
      cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.8 },
      0.2
    )
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.bento-grid {
  grid-auto-flow: dense;
}

/* Transitions for hover zoom effects */
.bento-card {
  transition: 
    border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
</style>
