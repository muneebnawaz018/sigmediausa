// Responsive sweep: screenshots the local preview build at common widths and
// reports any horizontal overflow with the offending elements.
// Usage: npm run build && npx vite preview --port 4173 &  then: node tools/respcheck.mjs
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const OUT = process.env.RESPCHECK_OUT || join(tmpdir(), 'respcheck-shots')
mkdirSync(OUT, { recursive: true })
const URL = process.env.RESPCHECK_URL || 'http://localhost:4173/'
const WIDTHS = [1440, 1280, 1024, 768, 600, 480, 390, 320]

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].filter(Boolean)

const { existsSync } = await import('node:fs')
const executablePath = CHROME_PATHS.find((p) => existsSync(p))
if (!executablePath) {
  console.error('Chrome not found — set CHROME_PATH env var to your Chrome/Chromium binary.')
  process.exit(1)
}

const browser = await puppeteer.launch({ executablePath, headless: 'new' })

for (const w of WIDTHS) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 3000))
  // walk page to fire reveals
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = window.innerHeight * 0.7
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 100))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 700))

  const report = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth
    const overflowPx = document.documentElement.scrollWidth - docW
    const offenders = []
    if (overflowPx > 0) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        // ignore elements inside intentional horizontal scrollers
        if (el.closest('[class*="rail"]')) continue
        if (r.right > docW + 1 || r.left < -1) {
          const cls = (typeof el.className === 'string' ? el.className : '').split(' ').slice(0, 2).join('.')
          offenders.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} L${Math.round(r.left)} R${Math.round(r.right)}`)
          if (offenders.length >= 8) break
        }
      }
    }
    return { overflowPx, offenders }
  })

  console.log(`--- ${w}px: overflow=${report.overflowPx}px`)
  report.offenders.forEach((o) => console.log('   ', o))
  await page.screenshot({ path: `${OUT}/r-${w}.png`, fullPage: true })
  await page.close()
}

await browser.close()
console.log(`sweep done — screenshots in ${OUT}`)
