describe('Run build', () => {
  it('should have title', () => {
    cy.visit('http://localhost:3000')
    cy.get('h1').contains('Welcome to Destack')
  })
  // it('builder page should have an editor', () => {
  //   cy.visit('http://localhost:3000/builder')
  //   cy.get('#gjs').should('be.visible')
  // })
})
