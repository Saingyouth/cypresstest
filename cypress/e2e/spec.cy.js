describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
    cy.task('log', JSON.stringify(Cypress.env()));
    cy.log('Cypress command log');
    cy.log(Cypress.env());
  })
})