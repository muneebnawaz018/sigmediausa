import { useEffect, useState } from "react";
import { HERO, CONTACT } from "../data/site.js";
import "./hero.css";

// Signature moment: the hero photo loads as a flat, ungraded frame and
// "develops" into the finished virtual-twilight shot — the same edit
// SIGMEDIA sells. EXIF readout confirms the grade once it lands.
export default function Hero() {
  const [developed, setDeveloped] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = window.innerWidth > 900 ? HERO.image : HERO.imageSmall;
    let timer;
    const start = () => {
      timer = setTimeout(() => setDeveloped(true), 350);
    };
    if (img.complete) start();
    else {
      img.onload = start;
      img.onerror = start;
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`hero ${developed ? "hero--developed" : ""}`}
      aria-label="SIGMEDIA — real estate media"
    >
      <picture className="hero__media">
        <source media="(max-width: 900px)" srcSet={HERO.imageSmall} />
        <img
          src={HERO.image}
          alt="Modern home at twilight with glowing windows under a fiery sunset sky"
          fetchPriority="high"
        />
      </picture>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__grade" aria-hidden="true">
        <span className="hero__grade-dot" />
        {developed ? "VIRTUAL TWILIGHT" : "RAW · DEVELOPING…"}
      </div>

      <div className="hero__content container container--wide">
        <p className="exif hero__eyebrow">{HERO.eyebrow}</p>
        <h1 className="hero__title">
          <span className="hero__title-a">{HERO.titleA}</span>
          <span className="hero__title-b">{HERO.titleB}</span>
        </h1>
        <p className="hero__sub">{HERO.sub}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={CONTACT.scheduleUrl}>
            {HERO.ctaPrimary}
          </a>
          <a className="btn btn--ghost" href="#work">
            {HERO.ctaSecondary}
          </a>
        </div>
      </div>

      <dl className="hero__exif" aria-label="SIGMEDIA at a glance">
        {HERO.exif.map(({ k, v }) => (
          <div className="hero__exif-item" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
