const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const sharp = require('sharp')
const process = require('process')

const tailwindUrl = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'

const componentsPath = process.cwd() + '/../lib/themes'
const themeName = process.argv[2]
if (!themeName) throw new Error('No theme name')

const viewportWidth = 1024
const imageWidth = 360
const aspectRatio = 0.55

// npm run screenshots -- hyperui
;(async () => {
  // create page
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    height: Math.floor(viewportWidth * aspectRatio),
    width: viewportWidth,
    deviceScaleFactor: 1,
  })

  // loop components
  const files = await fs.readdir(`${componentsPath}/${themeName}`)
  const components = files.filter((f) => f !== 'index.ts')
  for (let c of components) {
    // render html
    const source = await fs.readFile(`${componentsPath}/${themeName}/${c}/index.html`, 'utf8')
    const html = `<html><head><link rel="stylesheet" href="${tailwindUrl}"></head><body>${source.replaceAll(
      '`',
      '',
    )}</body></html>`
    await page.setContent(html)

    // take screenshot
    const filepath = `${componentsPath}/${themeName}/${c}/preview.png`
    await page.screenshot({ path: filepath })

    // resize image
    const buffer = await sharp(filepath).resize({ width: imageWidth }).png().toBuffer()
    await sharp(buffer).toFile(filepath)
  }

  // close page
  await browser.close()
})()
