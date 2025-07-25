describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
    console.log(Cypress.env('user_name'));
    console.log(Cypress.env('password'));
  })
})