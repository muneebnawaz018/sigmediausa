import { FOOTER, NAV_LINKS, CONTACT, MARKETS } from '../data/site.js'
import './footer.css'

// Brand icons — lucide dropped its brand set, so these are inline.
function InstagramIcon(props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__col footer__col--brand">
            <p className="footer__wordmark">SIGMEDIA</p>
            <p className="footer__tagline">{FOOTER.tagline}</p>
          </div>

          {/* Explore */}
          <nav className="footer__col" aria-label="Footer">
            <h3 className="footer__heading">Explore</h3>
            <ul className="footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a className="footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__list">
              {MARKETS.map((market) => (
                <li key={market.id}>
                  <a className="footer__link footer__phone" href={market.phoneHref}>
                    <span className="footer__phone-code">{market.code}</span>
                    {market.phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="footer__hours">Shooting · {CONTACT.hoursShooting}</p>
            <p className="footer__hours">Business · {CONTACT.hoursBusiness}</p>
          </div>

          {/* Follow */}
          <div className="footer__col">
            <h3 className="footer__heading">Follow</h3>
            <ul className="footer__list">
              <li>
                <a
                  className="footer__link footer__social"
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="footer__link footer__social"
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">{FOOTER.legal}</p>
          <p className="footer__micro">Shot · graded · delivered next day</p>
        </div>
      </div>
    </footer>
  )
}
