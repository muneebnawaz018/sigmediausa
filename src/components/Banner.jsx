import { openAppModal } from './AppModal.jsx'
import "./banner.css";

const PHRASES = [
  { text: 'Next-Day Turnaround' },
  { text: 'Easy Scheduling' },
  { text: 'Trendy Edits' },
  { text: 'Download the SIGMEDIAUSA App Today!', app: true },
  { text: 'Signature Consistency & Quality' },
];

// One full pass of the strip. Rendered several times back-to-back so the
// marquee revolves with no gap; only the first copy is exposed to a11y/tab.
function Sequence({ live }) {
  return (
    <div className="promo__group" aria-hidden={live ? undefined : true}>
      <a
        className="promo__chip promo__kit-link"
        href="#pricing"
        aria-label="Marketing Kit — 30 dollars, was 100. See details."
        tabIndex={live ? 0 : -1}
      >
        <span className="promo__star">✦</span>
        <span className="promo__deal">
          <strong>Marketing Kit</strong>
          <span className="promo__price">$30</span>
          <s className="promo__was">$100</s>
          <span className="promo__note">white-label, every listing</span>
        </span>
      </a>
      {PHRASES.map(({ text, app }) =>
        app ? (
          <button
            className="promo__chip promo__frame promo__frame--app promo__app-btn"
            onClick={openAppModal}
            key={text}
            tabIndex={live ? 0 : -1}
          >
            <span className="promo__item">{text}</span>
          </button>
        ) : (
          <span className="promo__chip promo__frame" key={text}>
            <span className="promo__item">{text}</span>
          </span>
        )
      )}
    </div>
  );
}

export default function Banner() {
  // 4 copies + a -50% loop keeps two full sequences on screen at all times,
  // so the seam never opens a gap even on wide displays.
  const COPIES = 4;
  return (
    <aside className="promo" aria-label="Offers and highlights">
      <div className="promo__marquee">
        <div className="promo__track">
          {Array.from({ length: COPIES }, (_, i) => (
            <Sequence key={i} live={i === 0} />
          ))}
        </div>
      </div>
    </aside>
  );
}
