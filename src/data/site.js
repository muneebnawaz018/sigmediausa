// SIGMEDIA — single source of truth for copy, contact info and media paths.

// Media base — public assets hosted on Cloudflare Pages (sigmedia-assets project).
// Not a secret; hardcoded so no build-time env is needed.
const CDN = 'https://sigmedia-assets.pages.dev'

export const CONTACT = {
  phoneICT: '(316) 665-7700',
  phoneICTHref: 'tel:+13166657700',
  phoneDFW: '(972) 972-9346',
  phoneDFWHref: 'tel:+19729729346',
  email: 'support@sigmediausa.com',
  emailHref: 'mailto:support@sigmediausa.com',
  hoursShooting: 'Mon–Fri · 9:00 AM – 5:00 PM',
  hoursBusiness: 'Mon–Fri · 9:00 AM – 6:00 PM',
  instagram: 'https://www.instagram.com/sigmediausa/',
  facebook: 'https://www.facebook.com/sigmediausa/',
  scheduleUrl: '#contact',
}

export const MARKETS = [
  {
    id: 'ict',
    code: 'ICT',
    name: 'Wichita, KS',
    area: 'Wichita & surrounding areas',
    coords: '37.6872° N · 97.3301° W',
    phone: CONTACT.phoneICT,
    phoneHref: CONTACT.phoneICTHref,
  },
  {
    id: 'dfw',
    code: 'DFW',
    name: 'Dallas / Ft. Worth, TX',
    area: 'DFW metroplex & surrounding areas',
    coords: '32.7767° N · 96.7970° W',
    phone: CONTACT.phoneDFW,
    phoneHref: CONTACT.phoneDFWHref,
  },
]

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'The Package', href: '#package' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Coverage', href: '#coverage' },
]

export const HERO = {
  eyebrow: 'Real estate media · ICT + DFW',
  titleA: 'We don’t just capture homes.',
  titleB: 'We position them to compete.',
  sub: 'SIGMEDIA is the media partner trusted by high-performing agents who refuse to cut corners. Easy scheduling. Reliable turnaround. Elite-level presentation — every time.',
  ctaPrimary: 'Schedule a shoot',
  ctaSecondary: 'See our work',
  image: `${CDN}/media/photos/hero-2560.webp`,
  imageSmall: `${CDN}/media/photos/hero-1280.webp`,
  exif: [
    { k: 'TURNAROUND', v: 'Next day' },
    { k: 'MARKETS', v: 'ICT · DFW' },
    { k: 'PACKAGE', v: 'From $349' },
    { k: 'EDIT', v: 'Virtual twilight' },
  ],
}

export const SERVICES = [
  {
    id: 'photos',
    icon: 'Camera',
    title: 'MLS Photography',
    blurb:
      'Magazine-grade stills of every space that sells the home — shot, graded and delivered next day.',
    meta: 'From $150',
  },
  {
    id: 'video',
    icon: 'Clapperboard',
    title: 'Video',
    blurb:
      'Full cinematic walkthroughs and highlight reels cut for MLS, YouTube and social.',
    meta: 'From $100',
  },
  {
    id: 'drone',
    icon: 'Plane',
    title: 'Drone Coverage',
    blurb:
      'FAA-licensed aerial photo and video — the lot, the neighborhood and the view that sells it.',
    meta: 'From $150',
  },
  {
    id: 'twilight',
    icon: 'Sunset',
    title: 'Virtual Twilight',
    blurb:
      'Day shots re-graded into dusk showpieces with glowing windows — the scroll-stopper of any listing.',
    meta: 'From $25',
  },
  {
    id: 'tour',
    icon: 'Rotate3d',
    title: 'Zillow 3D Tour',
    blurb:
      'Interactive walk-through tours buyers can explore from anywhere, synced straight to your listing.',
    meta: 'From $99',
  },
  {
    id: 'plans',
    icon: 'LayoutDashboard',
    title: 'Floor Plans',
    blurb:
      '2D plans included with every residential shoot. 3D dollhouse renders that make layouts obvious.',
    meta: '2D included',
  },
]

export const PACKAGE = {
  eyebrow: 'The SIGMEDIA Package',
  price: '$349',
  priceNote: 'starting at',
  previewClip: `${CDN}/media/clips/reel-3a.mp4`,
  title: 'Everything a listing needs. One shoot.',
  blurb:
    'One appointment, next-day delivery, and a listing that shows up everywhere it matters — MLS, social, print and search.',
  items: [
    'MLS photos',
    'Social media reel',
    'Drone photos',
    'Virtual twilight',
    '2D floor plan',
    'Marketing kit',
  ],
  turnaround: 'Next-day turnaround',
  cta: 'Book the package',
}

export const WORK = {
  eyebrow: 'Our work',
  title: 'Shot to stop the scroll.',
  categories: [
    {
      id: 'interiors',
      label: 'Interiors',
      items: [
        { src: `${CDN}/media/photos/interior-11.webp`, alt: 'Living room at dusk with navy sectional, linear fireplace and sunset pool view' },
        { src: `${CDN}/media/photos/interior-12.webp`, alt: 'Luxury kitchen with black cabinets, gold accents and marble waterfall island' },
        { src: `${CDN}/media/photos/interior-16.webp`, alt: 'Two-story great room with black marble fireplace and cream curved sofas' },
        { src: `${CDN}/media/photos/interior-9.webp`, alt: 'Spa bathroom with freestanding tub and book-matched marble shower' },
        { src: `${CDN}/media/photos/interior-17.webp`, alt: 'Master bath suite in black marble opening to the bedroom' },
        { src: `${CDN}/media/photos/interior-1.webp`, alt: 'Modern foyer with stone column, wood slat screen and black pivot door' },
      ],
    },
    {
      id: 'exteriors',
      label: 'Exteriors',
      items: [
        { src: `${CDN}/media/photos/exterior-1.webp`, alt: 'Modern luxury home poolside with infinity spa edge and twin fire bowls' },
        { src: `${CDN}/media/photos/exterior-2.webp`, alt: 'Modern home rear elevation with fire bowls and tiled water feature' },
        { src: `${CDN}/media/photos/exterior-3.webp`, alt: 'Modern pool deck with fountain jets and rock fire pit' },
        { src: `${CDN}/media/photos/exterior-7.webp`, alt: 'Brick two-story traditional home with arched entry and manicured hedges' },
      ],
    },
    {
      id: 'aerials',
      label: 'Aerials',
      items: [
        { src: `${CDN}/media/photos/drone-1.webp`, alt: 'Aerial view of modern flat-roof home with rectangular pool and travertine deck' },
        { src: `${CDN}/media/photos/drone-5.webp`, alt: 'Aerial view of modern ranch home with raised deck pool and striped lawn' },
        { src: `${CDN}/media/photos/drone-night-2.webp`, alt: 'Aerial at dusk with glowing pool, landscape lighting and city lights beyond' },
        { src: `${CDN}/media/photos/drone-3.webp`, alt: 'Elevated aerial of stone estate with turret in a lake community' },
      ],
    },
    {
      id: 'twilights',
      label: 'Twilights',
      items: [
        { src: `${CDN}/media/photos/twilight-5.webp`, alt: 'Modern entry at twilight with glowing glass door under an orange sky' },
        { src: `${CDN}/media/photos/twilight-6.webp`, alt: 'Stone Tudor-style home at twilight with lit windows and curved walkway' },
        { src: `${CDN}/media/photos/twilight-4.webp`, alt: 'Sprawling stone estate under a vivid orange and purple sunset' },
        { src: `${CDN}/media/photos/drone-twilight.webp`, alt: 'Aerial of lakefront home at virtual twilight with fenced pool' },
      ],
    },
  ],
}

export const REELS = {
  eyebrow: 'Motion',
  title: 'Video that gets listings talked about.',
  sub: 'Vertical reels for social, cinematic walkthroughs for MLS and YouTube — shot and cut in-house.',
  // Short muted preview loops (vertical 540x960)
  clips: [
    { src: `${CDN}/media/clips/reel-1.mp4`, label: 'Highlight reel' },
    { src: `${CDN}/media/clips/agent-2a.mp4`, label: 'Agent reel' },
    { src: `${CDN}/media/clips/reel-3a.mp4`, label: 'Highlight reel' },
    { src: `${CDN}/media/clips/agent-4.mp4`, label: 'Agent reel' },
    { src: `${CDN}/media/clips/reel-4.mp4`, label: 'Highlight reel' },
    { src: `${CDN}/media/clips/agent-5.mp4`, label: 'Agent reel' },
  ],
  // Full examples (client-selected)
  fullExamples: [
    { src: `${CDN}/media/full/reel-5-full.mp4`, poster: `${CDN}/media/posters/reel-5.webp`, label: 'Highlight reel — full example', vertical: true },
    { src: `${CDN}/media/full/reel-6-full.mp4`, poster: `${CDN}/media/posters/reel-6.webp`, label: 'Highlight reel — full example', vertical: true },
    { src: `${CDN}/media/full/reel-7-full.mp4`, poster: `${CDN}/media/posters/reel-7.webp`, label: 'Highlight reel — full example', vertical: true },
    { src: `${CDN}/media/full/agent-2-full.mp4`, poster: `${CDN}/media/posters/agent-2.webp`, label: 'Agent reel — full example', vertical: true },
  ],
  cinematic: {
    preview: `${CDN}/media/clips/cine-1b.mp4`,
    full: `${CDN}/media/full/cine-1-full.mp4`,
    poster: `${CDN}/media/posters/cine-1.webp`,
    label: 'Cinematic walkthrough',
  },
}

export const PRICING = {
  eyebrow: 'Pricing',
  title: 'Priced by the square foot. No surprises.',
  sub: 'Photos include next-day turnaround and a 2D floor plan on every residential shoot.',
  photoTiers: [
    { range: '0 – 1,500 sq ft', price: '$150' },
    { range: '1,501 – 3,000 sq ft', price: '$175' },
    { range: '3,001 – 4,500 sq ft', price: '$200' },
    { range: '4,501 – 6,000 sq ft', price: '$265' },
    { range: '6,001+ sq ft', price: '$375' },
  ],
  alaCarte: [
    {
      group: 'Video',
      rows: [
        { name: 'Cinematic video', price: '$200' },
        { name: 'Highlight reel', price: '$100' },
        { name: 'Agent intro & outro (any video)', price: '+$50' },
      ],
    },
    {
      group: 'Drone',
      rows: [
        { name: 'Drone photos', price: '$150' },
        { name: 'Drone photos & video', price: '$250' },
      ],
    },
    {
      group: 'Zillow 3D Tour',
      rows: [
        { name: '0 – 3,000 sq ft', price: '$99' },
        { name: '3,001 – 4,500 sq ft', price: '$125' },
        { name: '4,501 – 6,000 sq ft', price: '$150' },
      ],
    },
    {
      group: 'Twilight & floor plans',
      rows: [
        { name: 'Virtual twilight — single', price: '$25' },
        { name: 'Virtual twilight — four pack', price: '$75' },
        { name: '2D floor plan (standalone)', price: '$75' },
        { name: '3D floor plan', price: '$125' },
        { name: '3D video + 3D & 2D floor plans', price: '$225' },
      ],
    },
    {
      group: 'Photoshop extras',
      rows: [
        { name: 'Grass replacement', price: '$75' },
        { name: 'Object removal', price: 'from $50' },
        { name: 'Exterior fixes', price: 'from $50' },
        { name: 'Driveway clean-up', price: '$50' },
        { name: 'Marketing kit', price: '$30' },
      ],
    },
  ],
  marketingKit: {
    title: 'Marketing kit — $30',
    blurb:
      'Property website, social assets and print materials generated for every listing. White-label ready.',
    previewClip: `${CDN}/media/clips/marketing-kit.mp4`,
    videoFull: `${CDN}/media/full/marketing-kit-full.mp4`,
    poster: `${CDN}/media/posters/marketing-kit.webp`,
    cta: 'Learn more',
  },
}

export const COVERAGE = {
  eyebrow: 'Coverage',
  title: 'Two markets. One standard.',
  sub: 'Same crews, same editing bench, same next-day promise in both metros.',
  hoursShooting: CONTACT.hoursShooting,
  hoursBusiness: CONTACT.hoursBusiness,
}

export const CTA = {
  eyebrow: 'Ready when you are',
  title: 'Your next listing deserves better media.',
  sub: 'Schedule online in minutes. Shot this week, delivered next day.',
  primary: 'Schedule a shoot',
  phoneLead: 'Or call your market line:',
}

export const FOOTER = {
  tagline: 'Premier real estate media for agents who refuse to cut corners.',
  links: NAV_LINKS,
  legal: `© ${new Date().getFullYear()} SIGMEDIA. All rights reserved.`,
}
