import { MapPin, Phone, Camera, Clock } from 'lucide-react'
import { COVERAGE, MARKETS } from '../data/site.js'
import Reveal from './Reveal.jsx'
import './coverage.css'

// Dual-market coverage: two oversized "airport code" cards (ICT / DFW)
// with direct market lines, closed out by a shared hours strip.
export default function Coverage() {
  return (
    <section id="coverage" className="section coverage">
      <div className="container">
        <Reveal>
          <p className="exif">
            {COVERAGE.eyebrow} <span className="exif__meta">· 37.68°N / 32.77°N</span>
          </p>
          <h2 className="section-title">{COVERAGE.title}</h2>
          <p className="section-lede">{COVERAGE.sub}</p>
        </Reveal>

        <div className="coverage__markets">
          {MARKETS.map((market, i) => (
            <Reveal key={market.id} delay={i * 140} className="coverage__cell reveal--scale">
              <article className="coverage__card">
                <span className="coverage__watermark" aria-hidden="true">
                  {market.code}
                </span>
                <p className="coverage__code">{market.code}</p>
                <h3 className="coverage__name">{market.name}</h3>
                <p className="coverage__area">{market.area}</p>
                <p className="coverage__coords">
                  <MapPin size={15} aria-hidden="true" />
                  {market.coords}
                </p>
                <a
                  className="coverage__phone"
                  href={market.phoneHref}
                  aria-label={`Call the ${market.name} line: ${market.phone}`}
                >
                  <Phone size={20} aria-hidden="true" />
                  {market.phone}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal as="dl" delay={200} className="coverage__hours">
          <div className="coverage__hours-item">
            <dt className="coverage__hours-label">
              <Camera size={16} aria-hidden="true" />
              Shooting hours
            </dt>
            <dd className="coverage__hours-value">{COVERAGE.hoursShooting}</dd>
          </div>
          <div className="coverage__hours-item">
            <dt className="coverage__hours-label">
              <Clock size={16} aria-hidden="true" />
              Business hours
            </dt>
            <dd className="coverage__hours-value">{COVERAGE.hoursBusiness}</dd>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
