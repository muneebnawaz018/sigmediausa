import { useEffect, useRef, useState } from 'react'
import { X, Camera, CalendarCheck, PackageCheck, ImageDown, BadgeCheck } from 'lucide-react'
import { CONTACT } from '../data/site.js'
import appstore from '../assets/appstore.svg'
import googleplay from '../assets/googleplay.png'
import './app-modal.css'

export const openAppModal = () => window.dispatchEvent(new CustomEvent('sig:appmodal'))

// What the app actually does for an agent — kept short so each row is one line
const FEATURES = [
  { icon: CalendarCheck, title: 'Book in seconds', text: 'Schedule or reschedule a shoot from anywhere.' },
  { icon: PackageCheck, title: 'Track every shoot', text: 'Live status from capture to final delivery.' },
  { icon: ImageDown, title: 'Grab your media', text: 'Download full-res photos, video & reels.' },
]

// Dialog offering the SIGMEDIAUSA app on both stores, using the official
// App Store and Google Play badges. Opened from the promo banner and the
// contact band via the `sig:appmodal` window event.
export default function AppModal() {
  const [open, setOpen] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener('sig:appmodal', show)
    return () => window.removeEventListener('sig:appmodal', show)
  }, [])

  useEffect(() => {
    if (!open) return
    cardRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="app-modal" onClick={() => setOpen(false)}>
      <div
        className="app-modal__card"
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="app-modal__glow" aria-hidden="true" />
        <button
          className="app-modal__close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="app-modal__body">
          {/* Left — the pitch + what the app does */}
          <div className="app-modal__intro">
            <p className="app-modal__eyebrow">The SIGMEDIAUSA App</p>
            <h2 id="app-modal-title" className="app-modal__title">
              Your listings, in your pocket.
            </h2>
            <p className="app-modal__sub">
              The whole workflow — booking, delivery and downloads — in one app,
              on iPhone and Android.
            </p>

            <ul className="app-modal__features">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="app-modal__feature">
                  <span className="app-modal__feature-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="app-modal__feature-copy">
                    <span className="app-modal__feature-title">{title}</span>
                    <span className="app-modal__feature-text">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — visual anchor + store badges */}
          <div className="app-modal__panel">
            <span className="app-modal__icon" aria-hidden="true">
              <Camera size={30} />
            </span>
            <p className="app-modal__panel-name">SIGMEDIAUSA</p>
            <p className="app-modal__panel-tag">Real estate media, handled.</p>

            <p className="app-modal__verified">
              <BadgeCheck size={15} aria-hidden="true" />
              Free · No subscription
            </p>

            <div className="app-modal__stores">
              <a
                className="app-modal__badge"
                href={CONTACT.appIos}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <img src={appstore} alt="Download on the App Store" />
              </a>
              <a
                className="app-modal__badge"
                href={CONTACT.appAndroid}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <img src={googleplay} alt="Get it on Google Play" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
