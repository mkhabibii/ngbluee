import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function useSwipeAnimation(options = {}) {
  const {
    containerSelector = '.swipe-container',
    triggerSelector = '#about',
    headingSelector = '.about-title',
    imageSelector = '.habibi-img',
    duration = 1.25,
    ease = 'power1.inOut',
  } = options

  const animating = ref(false)

  const animateIn = (element, direction = 1) => {
    if (!element) return

    const dFactor = direction === -1 ? -1 : 1
    const outerWrapper = element.querySelector('.outer')
    const innerWrapper = element.querySelector('.inner')
    const image = element.querySelector(imageSelector)
    const heading = element.querySelector(headingSelector)

    if (!outerWrapper || !innerWrapper) return

    const tl = gsap.timeline({
      defaults: { duration, ease },
      onComplete: () => {
        animating.value = false
      },
    })

    // Animate wrappers
    tl.fromTo(
      [outerWrapper, innerWrapper],
      {
        yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
      },
      {
        yPercent: 0,
      },
      0,
    )

    // Animate image
    if (image) {
      tl.fromTo(image, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    }

    // Animate heading jika ada
    if (heading && heading.children.length > 0) {
      const chars = Array.from(heading.querySelectorAll('.char'))
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: 'power2',
            stagger: {
              each: 0.02,
              from: 'random',
            },
          },
          0.2,
        )
      }
    }
  }

  const setupScrollAnimation = () => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    // Set initial state
    gsap.set(container.querySelector('.outer'), { yPercent: 100 })
    gsap.set(container.querySelector('.inner'), { yPercent: -100 })

    // Split heading jika ada
    const heading = container.querySelector(headingSelector)
    if (heading && !heading.querySelector('.char')) {
      new SplitType(heading, { types: 'chars' })
    }

    // Trigger animation on scroll
    ScrollTrigger.create({
      trigger: triggerSelector,
      start: 'top center',
      onEnter: () => {
        if (!animating.value) {
          animating.value = true
          animateIn(container, 1)
        }
      },
    })
  }

  const manualTrigger = (direction = 1) => {
    if (animating.value) return

    const container = document.querySelector(containerSelector)
    if (container) {
      animating.value = true
      animateIn(container, direction)
    }
  }

  onMounted(() => {
    setupScrollAnimation()
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  })

  return {
    animating,
    manualTrigger,
    animateIn,
  }
}
