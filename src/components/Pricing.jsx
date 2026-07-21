import { useState } from 'react'
import { ChevronDown, Play } from 'lucide-react'
import { PRICING } from '../data/site.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import AutoVideo from './AutoVideo.jsx'
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

            <button
              type="button"
              className="pricing__kit"
              onClick={() => setKitOpen(true)}
              aria-label="Play the marketing kit walkthrough"
            >
              <div className="pricing__kit-media">
                <AutoVideo
                  src={PRICING.marketingKit.previewClip}
                  poster={PRICING.marketingKit.poster}
                  className="pricing__kit-video"
                  label="Marketing kit walkthrough preview"
                />
                <span className="pricing__kit-scrim" aria-hidden="true" />
                <span className="pricing__kit-play" aria-hidden="true">
                  <Play size={22} strokeWidth={0} fill="currentColor" />
                </span>
              </div>
              <div className="pricing__kit-body">
                <h3 className="pricing__kit-title">{PRICING.marketingKit.title}</h3>
                <p className="pricing__kit-blurb">{PRICING.marketingKit.blurb}</p>
                <span className="btn btn--ghost pricing__kit-btn">
                  <Play size={18} aria-hidden="true" />
                  {PRICING.marketingKit.cta}
                </span>
              </div>
            </button>
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
