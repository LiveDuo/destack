const puppeteer = require('puppeteer')

const { execAsync, execAsyncUntil, killServer } = require('./utils')

require('./config')

describe('Run build', () => {
  it('should have title', async () => {
    await execAsync('cd dev/nextjs-project && npm run build')
    await execAsyncUntil('cd dev/nextjs-project && npm start -- -p 3001', {}, [
      'ready',
      'http://localhost:3001',
    ])

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3001', { waitUntil: 'load' })

    const heading2 = await page.waitForSelector('h1')
    const title = await heading2.evaluate((e) => e.textContent, heading2)
    expect(title).toMatch('Welcome to Destack')
  })
  afterAll(async () => {
    await killServer(3001)
  })
})
