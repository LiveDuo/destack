const filepath = 'dev/nextjs-project/data/default.json'

let data

describe('Load editor', () => {
  before(() => {
    cy.readFile(filepath).then((e) => (data = e))
  })
  it('should contain a "gjs" element', () => {
    cy.visit('http://localhost:3000')
    cy.get('#gjs').should('be.visible')

    // cy.visit('http://localhost:3000/builder')
    // cy.get('#gjs').should('be.visible')
  })
  it('should add block to canvas', () => {
    cy.writeFile(filepath, '{}')

    cy.wait(10000)

    // const button = await page.$('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')
    // await button.click()
    // await accept dialog

    // const blockCategory = await page.$('#gjs .gjs-block-category.gjs-open')
    // const block = await blockCategory.$('.gjs-blocks-c > div:nth-child(2)')

    // const { x, y, width, height } = await block.boundingBox()
    // await page.mouse.move(x + width / 2, y + height / 2)
    // await page.mouse.down()
    // await page.mouse.move(300, 300)
    // await page.mouse.up()

    // const iframeElement = await page.$('#gjs .gjs-frame')
    // const iframe = await iframeElement.contentFrame()

    // await iframe.waitForSelector('#wrapper section > div > div')
    // const section = await iframe.$('#wrapper section > div > div')
    // await expect(section).not.toBeNull()

    // const heading = await section.$eval('div:nth-child(2) h1', (el) => el.textContent)
    // expect(heading).toMatch('The Catalyzer')
  })
  after(() => {
    cy.writeFile(filepath, JSON.stringify(data))
  })
})
