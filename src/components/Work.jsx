import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, RotateCw, Maximize, Minimize } from 'lucide-react'
import { WORK } from '../data/site.js'
import Reveal from './Reveal.jsx'
import './work.css'

// Element fullscreen isn't supported on iOS Safari (video-only there); hide the
// button when the API is missing so it's never a dead control.
const FULLSCREEN_SUPPORTED =
  typeof document !== 'undefined' &&
  !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)

// Filterable portfolio grid: category pills swap a featured-first mosaic,
// tiles open a full-bleed lightbox with keyboard nav within the category.
export default function Work() {
  const [activeId, setActiveId] = useState(WORK.categories[0].id)
  const [lightbox, setLightbox] = useState(null) // item index or null
  const [rotated, setRotated] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const closeRef = useRef(null)
  const returnFocusRef = useRef(null)
  const lbRef = useRef(null)

  const activeCategory = WORK.categories.find((c) => c.id === activeId)
  const items = activeCategory.items
  const isOpen = lightbox !== null

  const openLightbox = (index, event) => {
    returnFocusRef.current = event.currentTarget
    setRotated(false)
    setLightbox(index)
  }

  const closeLightbox = () => setLightbox(null)

  const step = useCallback((dir) => {
    setRotated(false)
    setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length))
  }, [items.length])

  const toggleFullscreen = () => {
    const el = lbRef.current
    if (!el) return
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement
    if (fsEl) {
      ;(document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
    } else {
      ;(el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)
    }
  }

  const selectCategory = (id) => {
    setActiveId(id)
    setLightbox(null)
    setRotated(false)
  }

  // Track fullscreen state (incl. the user pressing Esc to leave fullscreen).
  useEffect(() => {
    const onFs = () =>
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    document.addEventListener('webkitfullscreenchange', onFs)
    return () => {
      document.removeEventListener('fullscreenchange', onFs)
      document.removeEventListener('webkitfullscreenchange', onFs)
    }
  }, [])

  // Leave fullscreen when the lightbox closes.
  useEffect(() => {
    if (isOpen) return
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      ;(document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
    }
  }, [isOpen])

  // Browser Back closes the lightbox instead of leaving the page.
  useEffect(() => {
    if (!isOpen) return
    window.history.pushState({ workLightbox: true }, '')
    const onPop = () => setLightbox(null)
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      if (window.history.state?.workLightbox) window.history.back()
    }
  }, [isOpen])

  // Lock body scroll + move focus while the lightbox is open
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      returnFocusRef.current?.focus()
    }
  }, [isOpen])

  // Esc closes, arrow keys cycle within the active category, Tab stays trapped
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'Tab') {
        const dialog = closeRef.current?.closest('.work__lightbox')
        if (!dialog) return
        const focusables = dialog.querySelectorAll('button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, step])

  return (
    <section id="work" className="section work">
      <div className="container container--wide">
        <Reveal className="work__header">
          <div className="work__heading">
            <p className="exif">
              {WORK.eyebrow} <span className="exif__meta">· signature consistency & quality</span>
            </p>
            <h2 className="section-title">{WORK.title}</h2>
          </div>

          <div className="work__filters" role="group" aria-label="Filter the gallery by category">
            {WORK.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`work__pill${cat.id === activeId ? ' is-active' : ''}`}
                aria-pressed={cat.id === activeId}
                onClick={() => selectCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="work__grid" key={activeId}>
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={`work__tile${i === 0 ? ' work__tile--featured' : ''}`}
                onClick={(e) => openLightbox(i, e)}
                aria-label={`View larger — ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="work__caption" aria-hidden="true">
                  {item.alt}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {isOpen && (
        <div
          ref={lbRef}
          className="work__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCategory.label} — image ${lightbox + 1} of ${items.length}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <div className="work__lb-controls">
            <button
              type="button"
              className="work__lb-ctrl"
              aria-pressed={rotated}
              aria-label={rotated ? 'Rotate image upright' : 'Rotate image'}
              onClick={() => setRotated((r) => !r)}
            >
              <RotateCw size={20} aria-hidden="true" />
            </button>
            {FULLSCREEN_SUPPORTED && (
              <button
                type="button"
                className="work__lb-ctrl"
                aria-pressed={isFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize size={20} aria-hidden="true" />
                ) : (
                  <Maximize size={20} aria-hidden="true" />
                )}
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              className="work__lb-ctrl"
              aria-label="Close image viewer"
              onClick={closeLightbox}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="work__lb-nav work__lb-nav--prev"
            aria-label="Previous image"
            onClick={() => step(-1)}
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>

          <figure className={`work__lb-figure${rotated ? ' is-rotated' : ''}`}>
            <img
              src={items[lightbox].src}
              alt={items[lightbox].alt}
              onContextMenu={(e) => e.preventDefault()}
            />
            <figcaption className="work__lb-caption">
              <span className="work__lb-count">
                {String(lightbox + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              {items[lightbox].alt}
            </figcaption>
          </figure>

          <button
            type="button"
            className="work__lb-nav work__lb-nav--next"
            aria-label="Next image"
            onClick={() => step(1)}
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
