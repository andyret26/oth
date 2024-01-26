describe("My Fist Test", () => {
  it("Visits osu-th", () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="nav-search"]').type("Andy26")

    cy.get('[data-cy="player-3191010"]').click()

  })
})