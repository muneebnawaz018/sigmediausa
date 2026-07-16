import { useState } from 'react'
import { ChevronDown, Play } from 'lucide-react'
import { PRICING } from '../data/site.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import './pricing.css'

// Rate-card rows: name · dotted leader · price
function PriceRows({ rows, nameKey = 'name' }) {
  return (
    <ul className="pricing__rows">
      {rows.map((row) => (
        <li className="pricing__row" key={row[nameKey]}>
          <span className="pricing__row-name">{row[nameKey]}</span>
          <span className="pricing__leader" aria-hidden="true" />
          <span className="pricing__price">{row.price}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Pricing() {
  const [kitOpen, setKitOpen] = useState(false)

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <div className="pricing__grid">
          {/* LEFT — sticky intro + marketing kit card */}
          <Reveal className="pricing__intro">
            <p className="exif">
              {PRICING.eyebrow} <span className="exif__meta">· per sq ft</span>
            </p>
            <h2 className="section-title">{PRICING.title}</h2>
            <p className="section-lede">{PRICING.sub}</p>

            <div className="pricing__kit">
              <div className="pricing__kit-media">
                <img
                  src={PRICING.marketingKit.poster}
                  alt="Preview of the SIGMEDIA marketing kit — property website, social assets and print materials for a listing"
                  loading="lazy"
                />
              </div>
              <div className="pricing__kit-body">
                <h3 className="pricing__kit-title">{PRICING.marketingKit.title}</h3>
                <p className="pricing__kit-blurb">{PRICING.marketingKit.blurb}</p>
                <button
                  type="button"
                  className="btn btn--ghost pricing__kit-btn"
                  onClick={() => setKitOpen(true)}
                >
                  <Play size={18} aria-hidden="true" />
                  {PRICING.marketingKit.cta}
                </button>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — photo tiers + à la carte accordions */}
          <div className="pricing__tables">
            <Reveal className="pricing__block">
              <h3 className="pricing__block-label">Photos</h3>
              <PriceRows rows={PRICING.photoTiers} nameKey="range" />
              <p className="pricing__note">
                Includes next-day turnaround + 2D floor plan on every residential shoot
              </p>
            </Reveal>

            <Reveal delay={100} className="pricing__block">
              <h3 className="pricing__block-label">À la carte</h3>
              <div className="pricing__groups">
                {PRICING.alaCarte.map((group, i) => (
                  <details className="pricing__group" key={group.group} open={i === 0}>
                    <summary className="pricing__summary">
                      {group.group}
                      <ChevronDown className="pricing__chev" size={18} aria-hidden="true" />
                    </summary>
                    <div className="pricing__group-body">
                      <PriceRows rows={group.rows} />
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <VideoModal
        open={kitOpen}
        onClose={() => setKitOpen(false)}
        src={PRICING.marketingKit.videoFull}
        poster={PRICING.marketingKit.poster}
        title="Marketing kit — full video"
      />
    </section>
  )
}
