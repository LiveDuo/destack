const { execAsync, execAsyncUntil, killServer } = require('./utils')

require('./config')

describe('Run build', () => {
  beforeAll(async () => {
    const regexStr = '^.*?started.*?http://localhost.*?$'
    await execAsync('cd dev/nextjs-project && npm run build')
    await execAsyncUntil('cd dev/nextjs-project && npm start', {}, regexStr)
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })
  it('should have title', async () => {
    const heading2 = await page.waitForSelector('h1')
    const title = await heading2.evaluate((e) => e.textContent, heading2)
    expect(title).toMatch('Welcome to Destack')
  })
  afterAll(async () => {
    await killServer(3000)
  })
})
