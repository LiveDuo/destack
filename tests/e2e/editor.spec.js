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

    // const dataTransfer = new DataTransfer()
    // dataTransfer.setData('text', 'test')
    // cy.log(dataTransfer.getData('text'))

    // cy.get('#gjs .gjs-block-category.gjs-open .gjs-blocks-c > div:nth-child(5)')
    //     .trigger('dragstart', { dataTransfer})

    // cy.get('#gjs .gjs-frame').its('0.contentDocument.body')
    //     .trigger('drop', { dataTransfer })

    // const heading = await section.$eval('div:nth-child(2) h1', (el) => el.textContent)
    // expect(heading).toMatch('The Catalyzer')
  })
  after(() => {
    cy.writeFile(filepath, JSON.stringify(data))
  })
})
