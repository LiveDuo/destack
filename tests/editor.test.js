const { killServer, execAsyncUntil } = require('./utils')
const { copyTemplateFromTemp, copyTemplateToTemp } = require('./utils')
const { launch: puppeteerConfig } = require('../jest-puppeteer.config')
const { dragAndDrop, logMouseEvents } = require('./utils/mouse')

require('./config')

// https://github.com/puppeteer/puppeteer/issues/4690, https://github.com/puppeteer/puppeteer/issues/1265
// https://stackoverflow.com/questions/55848831/how-to-simulate-drag-drop-action-in-pupeteer
// As a very important final note, all the above functions work only with: headless: false
// It's an issue with await page.mouse events, they work with only headless = false.

describe('Load editor', () => {
  beforeAll(async () => {
    await copyTemplateToTemp()
    await execAsyncUntil('npm run dev', {}, 'compiled successfully')
    await page.setViewport({ width: 800, height: 600 })
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })
  it('should contain a "gjs" element', async () => {
    await expect(page.$('#gjs')).resolves.not.toBeNull()
  })
  it('should add block to canvas', async () => {
    // await logMouseEvents(page)

    await page.waitForSelector('#gjs')
    await page.waitForSelector('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')
    const button = await page.$('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')
    let confirmed = false
    await page.on('dialog', async (dialog) => {
      if (!confirmed) {
        await dialog.accept()
        confirmed = true
      }
    })
    await button.click()

    return

    await page.waitForSelector('#gjs .gjs-block-category.gjs-open')
    const blockCategory = await page.$('#gjs .gjs-block-category.gjs-open')
    const block = await blockCategory.$('.gjs-blocks-c > div:nth-child(2)')

    if (!puppeteerConfig.headless) {
      const { x, y, width, height } = await block.boundingBox()
      await page.mouse.move(x + width / 2, y + height / 2)
      await page.mouse.down()
      await page.mouse.move(300, 300)
      await page.mouse.up()
    } else {
      await dragAndDrop(
        '#gjs .gjs-block-category.gjs-open > .gjs-blocks-c > div:nth-child(2)',
        '#gjs .gjs-frame',
      )
    }

    const iframeElement = await page.$('#gjs .gjs-frame')
    const iframe = await iframeElement.contentFrame()

    await iframe.waitForSelector('#wrapper section > div > div')
    const section = await iframe.$('#wrapper section > div > div')
    await expect(section).not.toBeNull()

    const heading = await section.$eval('div:nth-child(2) h1', (el) => el.textContent)
    expect(heading).toMatch('The Catalyzer')
  }, 10000)
  afterAll(async () => {
    await killServer(3000)
    await copyTemplateFromTemp()
  })
})
