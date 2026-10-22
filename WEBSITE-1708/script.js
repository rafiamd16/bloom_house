const menuToggle = document.querySelector('#menu-toggle')
const primaryNav = document.querySelector('#primary-nav')

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isExpanded))
  menuToggle.setAttribute('aria-label', isExpanded ? 'Buka menu navigasi' : 'Tutup menu navigasi')
  primaryNav.classList.toggle('hidden', isExpanded)
})

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'Buka menu navigasi')
    primaryNav.classList.add('hidden')
  })
})

const visibleSlides = () =>
  window.matchMedia('(min-width: 1024px)').matches
    ? 3
    : window.matchMedia('(min-width: 640px)').matches
      ? 2
      : 1

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('[data-slide]')]
  const previous = carousel.querySelector('[data-prev]')
  const next = carousel.querySelector('[data-next]')
  let startIndex = 0

  const renderSlides = () => {
    const count = visibleSlides()
    const maxStart = Math.max(0, slides.length - count)
    startIndex = Math.min(startIndex, maxStart)
    slides.forEach((slide, index) => {
      const isVisible = index >= startIndex && index < startIndex + count
      slide.hidden = !isVisible
      slide.setAttribute('aria-hidden', String(!isVisible))
    })
    previous.disabled = startIndex === 0
    next.disabled = startIndex === maxStart
  }

  previous.addEventListener('click', () => {
    startIndex = Math.max(0, startIndex - 1)
    renderSlides()
  })
  next.addEventListener('click', () => {
    startIndex = Math.min(slides.length - visibleSlides(), startIndex + 1)
    renderSlides()
  })
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous.click()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next.click()
    }
  })
  window.addEventListener('resize', renderSlides)
  renderSlides()
})

const newsletterForm = document.querySelector('#newsletter-form')
const newsletterEmail = document.querySelector('#newsletter-email')
const newsletterMessage = document.querySelector('#newsletter-message')

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!newsletterEmail.value.trim() || !newsletterEmail.validity.valid) {
    newsletterEmail.setAttribute('aria-invalid', 'true')
    newsletterMessage.textContent = 'Masukkan alamat email yang valid.'
    newsletterMessage.className = 'mt-2 min-h-5 text-xs text-red-700'
    newsletterEmail.focus()
    return
  }
  newsletterEmail.removeAttribute('aria-invalid')
  newsletterMessage.textContent =
    'Format email valid. Ini hanya demo; email tidak dikirim atau disimpan.'
  newsletterMessage.className = 'mt-2 min-h-5 text-xs text-leaf'
})

newsletterEmail.addEventListener('input', () => {
  newsletterEmail.removeAttribute('aria-invalid')
})
