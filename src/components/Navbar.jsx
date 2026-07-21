import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, CONTACT } from '../data/site.js'
import './navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
        <div className="nav__inner container container--wide">
          <a className="nav__logo" href="#main" aria-label="SIGMEDIA — home" onClick={close}>
            SIGMEDIA
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="btn btn--primary nav__cta" href={CONTACT.scheduleUrl}>
              Schedule a shoot
            </a>
            <button
              className="nav__burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sheet lives OUTSIDE the header so its position:fixed anchors to the
          viewport — the header's backdrop-filter would otherwise trap it.
          Any click that isn't on a link closes it. */}
      <div
        id="mobile-menu"
        className={`nav__sheet ${open ? 'nav__sheet--open' : ''}`}
        onClick={(e) => {
          if (!e.target.closest('a')) close()
        }}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--primary" href={CONTACT.scheduleUrl} onClick={close}>
            Schedule a shoot
          </a>
        </nav>
      </div>
    </>
  )
}
