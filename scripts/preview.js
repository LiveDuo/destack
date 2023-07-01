const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const process = require('process')

const tailwindUrl = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'

const componentsPath = process.cwd() + '/../lib/themes'
const themeName = process.argv[2]
if (!themeName) throw new Error('No theme name')

const componentName = process.argv[3]
if (!componentName)
  throw new Error('No component name')

  // npm run preview -- hyperui Banner1
;(async () => {
  // create page
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // render html
  const source = await fs.readFile(
    `${componentsPath}/${themeName}/${componentName}/index.html`,
    'utf8',
  )
  const html = `<html><head><link rel="stylesheet" href="${tailwindUrl}"></head><body>${source.replaceAll(
    '`',
    '',
  )}</body></html>`
  await page.setContent(html)

  // wait for a long time
  await new Promise((r) => setTimeout(r, 50000))

  // close page
  await browser.close()
})()
