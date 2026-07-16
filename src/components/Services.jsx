import { Camera, Clapperboard, Plane, Sunset, Rotate3d, LayoutDashboard } from 'lucide-react'
import { SERVICES } from '../data/site.js'
import Reveal from './Reveal.jsx'
import './services.css'

const ICONS = {
  Camera,
  Clapperboard,
  Plane,
  Sunset,
  Rotate3d,
  LayoutDashboard,
}

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal className="services__header">
          <p className="exif">
            Services <span className="exif__meta">· f/8 · ISO 100</span>
          </p>
          <h2 className="section-title">Every listing, fully armed.</h2>
          <p className="section-lede">
            One shoot arms your listing for every channel — MLS, social, YouTube,
            print and search — from a single appointment.
          </p>
        </Reveal>

        <ul className="services__grid">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon]
            return (
              <Reveal as="li" key={service.id} delay={index * 70} className="services__item">
                <article className="services__card">
                  <span className="services__icon" aria-hidden="true">
                    {Icon ? <Icon size={24} strokeWidth={1.75} /> : null}
                  </span>
                  <h3 className="services__name">{service.title}</h3>
                  <p className="services__blurb">{service.blurb}</p>
                  <p className="services__meta">{service.meta}</p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
