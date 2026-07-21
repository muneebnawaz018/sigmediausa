import { Check, Zap } from 'lucide-react'
import { PACKAGE, CONTACT } from '../data/site.js'
import Reveal from './Reveal.jsx'
import AutoVideo from './AutoVideo.jsx'
import './package.css'

// The $349 flagship offer — elevated band card, price lockup left,
// autoplaying cinematic preview bleeding to the card edge on the right.
export default function Package() {
  return (
    <section id="package" className="section package">
      <div className="container container--wide">
        <Reveal className="package__card">
          <div className="package__body">
            <p className="exif">
              {PACKAGE.eyebrow} <span className="exif__meta">· one shoot</span>
            </p>

            <p className="package__price-lockup">
              <span className="package__price-note">{PACKAGE.priceNote}</span>
              <span className="package__price">{PACKAGE.price}</span>
            </p>

            <h2 className="package__title">{PACKAGE.title}</h2>
            <p className="package__blurb">{PACKAGE.blurb}</p>

            <ul className="package__list">
              {PACKAGE.items.map((item) => (
                <li className="package__item" key={item}>
                  <Check className="package__check" size={18} strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="package__footer">
              <a className="btn btn--primary package__cta" href={CONTACT.scheduleUrl}>
                {PACKAGE.cta}
              </a>
              <p className="package__turnaround">
                <Zap size={15} aria-hidden="true" />
                {PACKAGE.turnaround}
              </p>
            </div>
          </div>

          <div className="package__media">
            <AutoVideo
              src={PACKAGE.previewClip}
              threshold={0.3}
              label="Cinematic walkthrough preview of a listing shot by SIGMEDIA"
            />
            <span className="package__media-blend" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
