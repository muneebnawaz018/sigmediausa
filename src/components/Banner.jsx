import "./banner.css";

export default function Banner() {
  return (
    <aside className="promo" aria-label="Marketing Kit offer">
      <a
        className="promo__marquee"
        href="#pricing"
        aria-label="Marketing Kit — 30 dollars, was 100. See details."
      >
        <span className="promo__track" aria-hidden="true">
          <span className="promo__chip">
            <span className="promo__star">✦</span>
            <span className="promo__deal">
              <strong>Marketing Kit</strong>
              <span className="promo__price">$30</span>
              <s className="promo__was">$100</s>
              <span className="promo__note">white-label, every listing</span>
            </span>
          </span>
        </span>
      </a>
    </aside>
  );
}
