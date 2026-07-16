import puppeteer from 'puppeteer-core'

const OUT = '/private/tmp/claude-501/-Users-muneeb-Desktop-Data-Development-sigmediausa/fef98e66-f197-42dc-9b3b-03387c34d664/scratchpad/shots'
const URL = 'http://localhost:4173/'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})

async function autoscroll(page) {
  // Walk the page so every IntersectionObserver reveal fires, then return to top.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = window.innerHeight * 0.7
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 400))
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 900))
}

async function shoot(width, height, name, { fullPage = true, actions = null } = {}) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 3500)) // hero develop + reveals
  await autoscroll(page)
  if (actions) await actions(page)
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage })
  await page.close()
  console.log(name, 'done')
}

// Full pages
await shoot(1440, 900, 'pp-desktop-full')
await shoot(390, 844, 'pp-mobile-full')

// Interactions: work lightbox open
await shoot(1440, 900, 'pp-lightbox', {
  fullPage: false,
  actions: async (page) => {
    await page.evaluate(() => document.querySelector('#work')?.scrollIntoView())
    await new Promise((r) => setTimeout(r, 800))
    const tiles = await page.$$('#work button, #work [role="button"]')
    // click first image tile (skip filter pills: pills are small, tiles have img children)
    for (const t of tiles) {
      const hasImg = await t.$('img')
      if (hasImg) { await t.click(); break }
    }
    await new Promise((r) => setTimeout(r, 900))
  },
})

// Mobile nav open
await shoot(390, 844, 'pp-mobile-nav', {
  fullPage: false,
  actions: async (page) => {
    await page.click('.nav__burger')
    await new Promise((r) => setTimeout(r, 600))
  },
})

await browser.close()
