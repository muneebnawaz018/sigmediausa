import { Phone, Clock, Mail } from 'lucide-react'
import { CTA, MARKETS, CONTACT } from '../data/site.js'
import { openAppModal } from './AppModal.jsx'
import Reveal from './Reveal.jsx'
import './cta-band.css'

// Closing band: one centered ask, two market phone lines, a rising glow.
// No cards, no grid — just type, buttons and the amber horizon.
export default function CtaBand() {
  const [ict, dfw] = MARKETS

  return (
    <section id="contact" className="section cta-band" aria-labelledby="cta-band-title">
      <div className="container">
        <Reveal as="p" className="exif cta-band__eyebrow">
          {CTA.eyebrow}{' '}
          <button className="exif__meta cta-band__app-link" onClick={openAppModal}>
            · download the SIGMEDIAUSA app today!
          </button>
        </Reveal>

        <Reveal as="h2" id="cta-band-title" delay={80} className="cta-band__title">
          {CTA.title}
        </Reveal>

        <Reveal as="p" delay={160} className="section-lede cta-band__sub">
          {CTA.sub}
        </Reveal>

        <Reveal delay={240} className="cta-band__phones">
          <p className="cta-band__lead">{CTA.phoneLead}</p>

          <div className="cta-band__actions">
            <a className="btn btn--primary cta-band__btn" href={ict.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {ict.code} · <span className="cta-band__num">{ict.phone}</span>
            </a>
            <a className="btn btn--ghost cta-band__btn" href={dfw.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {dfw.code} · <span className="cta-band__num">{dfw.phone}</span>
            </a>
          </div>

          <a className="cta-band__email" href={CONTACT.emailHref}>
            <Mail size={14} aria-hidden="true" />
            {CONTACT.email}
          </a>

          <p className="cta-band__hours">
            <Clock size={14} aria-hidden="true" />
            {CONTACT.hoursBusiness}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
