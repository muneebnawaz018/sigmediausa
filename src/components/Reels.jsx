import { useState } from 'react'
import { Play } from 'lucide-react'
import { REELS } from '../data/site.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import AutoVideo from './AutoVideo.jsx'
import './reels.css'

export default function Reels() {
  const [modal, setModal] = useState(null)

  return (
    <section id="reels" className="section reels">
      <div className="container">
        <Reveal>
          <p className="exif">
            {REELS.eyebrow} <span className="exif__meta">· 30fps · vertical + wide</span>
          </p>
          <h2 className="section-title">{REELS.title}</h2>
          <p className="section-lede">{REELS.sub}</p>
        </Reveal>
      </div>

      {/* Row 1 — phone rail of muted vertical loops */}
      <div className="container container--wide">
        <Reveal delay={100}>
          <div
            className="reels__rail"
            role="region"
            aria-label="Short reel previews, scrolls sideways"
            tabIndex={0}
          >
            {REELS.clips.map((clip) => (
              <figure className="reels__phone" key={clip.src}>
                <button
                  type="button"
                  className="reels__phone-frame"
                  aria-label={`Play ${clip.label}`}
                  onClick={() => setModal({ src: clip.src, vertical: true, title: clip.label })}
                >
                  <AutoVideo src={clip.src} threshold={0.4} className="reels__phone-video" />
                  <span className="reels__phone-play" aria-hidden="true">
                    <Play size={16} strokeWidth={0} fill="currentColor" />
                  </span>
                </button>
                <figcaption className="reels__phone-label">{clip.label}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="container">
        {/* Row 2 — full examples, open in modal with sound */}
        <Reveal className="reels__examples">
          <h3 className="reels__row-title">Full examples — press play, sound on</h3>
          <div className="reels__grid">
            {REELS.fullExamples.map((ex) => (
              <button
                key={ex.src}
                type="button"
                className="reels__card"
                aria-label={`Play ${ex.label}`}
                onClick={() =>
                  setModal({ src: ex.src, poster: ex.poster, vertical: true, title: ex.label })
                }
              >
                <img src={ex.poster} alt="" loading="lazy" />
                <span className="reels__play" aria-hidden="true">
                  <Play size={18} strokeWidth={0} fill="currentColor" />
                </span>
                <span className="reels__card-label">{ex.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Row 3 — cinematic feature */}
        <Reveal className="reels__cinematic" delay={100}>
          <div className="reels__cinematic-media">
            <AutoVideo
              src={REELS.cinematic.preview}
              poster={REELS.cinematic.poster}
              threshold={0.3}
              className="reels__cinematic-video"
            />
          </div>
          <div className="reels__cinematic-overlay">
            <p className="reels__cinematic-label">{REELS.cinematic.label}</p>
            <button
              type="button"
              className="btn btn--primary reels__cinematic-btn"
              onClick={() =>
                setModal({
                  src: REELS.cinematic.full,
                  poster: REELS.cinematic.poster,
                  vertical: false,
                  title: REELS.cinematic.label,
                })
              }
            >
              <Play size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" />
              Watch full film
            </button>
          </div>
        </Reveal>
      </div>

      <VideoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        src={modal?.src}
        poster={modal?.poster}
        vertical={modal?.vertical ?? false}
        title={modal?.title}
      />
    </section>
  )
}
