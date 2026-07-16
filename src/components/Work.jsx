import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { WORK } from '../data/site.js'
import Reveal from './Reveal.jsx'
import './work.css'

// Filterable portfolio grid: category pills swap a featured-first mosaic,
// tiles open a full-bleed lightbox with keyboard nav within the category.
export default function Work() {
  const [activeId, setActiveId] = useState(WORK.categories[0].id)
  const [lightbox, setLightbox] = useState(null) // item index or null
  const closeRef = useRef(null)
  const returnFocusRef = useRef(null)

  const activeCategory = WORK.categories.find((c) => c.id === activeId)
  const items = activeCategory.items
  const isOpen = lightbox !== null

  const openLightbox = (index, event) => {
    returnFocusRef.current = event.currentTarget
    setLightbox(index)
  }

  const closeLightbox = () => setLightbox(null)

  const step = (dir) =>
    setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length))

  const selectCategory = (id) => {
    setActiveId(id)
    setLightbox(null)
  }

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

  // Esc closes, arrow keys cycle within the active category
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, items.length])

  return (
    <section id="work" className="section work">
      <div className="container container--wide">
        <Reveal className="work__header">
          <div className="work__heading">
            <p className="exif">
              {WORK.eyebrow} <span className="exif__meta">· 24mm · 1/250s</span>
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
          className="work__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCategory.label} — image ${lightbox + 1} of ${items.length}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="work__lb-close"
            aria-label="Close image viewer"
            onClick={closeLightbox}
          >
            <X size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="work__lb-nav work__lb-nav--prev"
            aria-label="Previous image"
            onClick={() => step(-1)}
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>

          <figure className="work__lb-figure">
            <img src={items[lightbox].src} alt={items[lightbox].alt} />
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
