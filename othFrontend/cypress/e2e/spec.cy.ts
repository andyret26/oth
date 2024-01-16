describe("My Fist Test", () => {
  it("Visits osu-th", () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="nav-search"]').type("Andy26")

    cy.get('[data-cy="player-3191010"]').click()

    // cy.url().should("include", "commands/actions")
    //     // Get an input, type into it
    //     cy.get('.action-email').type('fake@email.com')

    //     //  Verify that the value has been updated
    //     cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})