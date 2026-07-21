import Banner from './components/Banner.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Package from './components/Package.jsx'
import Work from './components/Work.jsx'
import Reels from './components/Reels.jsx'
import Pricing from './components/Pricing.jsx'
import Coverage from './components/Coverage.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Banner />
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Package />
        <Work />
        <Reels />
        <Pricing />
        <Coverage />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
