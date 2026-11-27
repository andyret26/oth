const creatorId = 3191010;
const teammateId = 4000000;
const tournament = {
  id: 28,
  date: "2025-01-01T00:00:00.000Z",
  name: "OHC Cup",
  teamName: "Blue Team",
  forumPostLink: "",
  mainSheetLink: "",
  bracketLink: "",
  rankRange: "Global rank 1-1000",
  seed: 1,
  format: "Double Elimination",
  teamSize: "4v4",
  placement: "1st",
  notes: "",
  imageLink: "",
  teamMates: [
    { id: creatorId, username: "Creator" },
    { id: teammateId, username: "Teammate" },
  ],
  addedById: creatorId,
};

function visitAsCreator(historyPlayerId: number) {
  cy.visit(`/history/${historyPlayerId}`, {
    onBeforeLoad(win) {
      const clientId = Cypress.env("auth0ClientId");
      const auth0Domain = Cypress.env("auth0Domain");
      const expiresAt = Math.floor(Date.now() / 1000) + 3600;
      const sub = `auth0|osu|${creatorId}`;
      const claims = {
        __raw: "e30.e30.e2e-signature",
        sub,
        exp: expiresAt,
      };

      win.localStorage.setItem(
        `@@auth0spajs@@::${clientId}::default::openid profile email`,
        JSON.stringify({
          body: {
            access_token: "e2e-access-token",
            id_token: claims.__raw,
            scope: "openid profile email",
            client_id: clientId,
            audience: "default",
            expires_in: 3600,
            decodedToken: {
              user: { sub, name: "Creator" },
              claims: {
                ...claims,
                iss: `https://${auth0Domain}/`,
              },
            },
          },
          expiresAt,
        })
      );
    },
  });
}

describe("creator tournament deletion", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/v1/tournament/player/*", [tournament]).as(
      "getHistory"
    );
  });

  it("hides the delete action when the creator views a teammate's history", () => {
    visitAsCreator(teammateId);

    cy.wait("@getHistory");
    cy.contains("OHC Cup").should("be.visible");
    cy.get('button[aria-label="Delete OHC Cup"]').should("not.exist");
  });

  it("shows an accessible delete action on the creator's own history", () => {
    visitAsCreator(creatorId);

    cy.wait("@getHistory");
    cy.get('button[aria-label="Delete OHC Cup"]')
      .should("be.visible")
      .and("have.text", "");
  });

  it("leaves the result unchanged and sends no request when confirmation is cancelled", () => {
    cy.intercept("DELETE", "**/api/v1/tournament/28").as("deleteTournament");
    cy.on("window:confirm", (message) => {
      expect(message).to.contain("OHC Cup");
      expect(message).to.contain("every teammate's history");
      return false;
    });

    visitAsCreator(creatorId);
    cy.wait("@getHistory");
    cy.get('button[aria-label="Delete OHC Cup"]').click();

    cy.contains("OHC Cup").should("be.visible");
    cy.get("@deleteTournament.all").should("have.length", 0);
  });

  it("deletes the result from the current history after confirmation", () => {
    cy.intercept("DELETE", "**/api/v1/tournament/28", {
      statusCode: 204,
      delay: 200,
    }).as("deleteTournament");
    cy.on("window:confirm", () => true);

    visitAsCreator(creatorId);
    cy.wait("@getHistory");
    cy.get('button[aria-label="Delete OHC Cup"]').click();
    cy.get('button[aria-label="Delete OHC Cup"]').should("be.disabled");

    cy.wait("@deleteTournament")
      .its("request.headers.authorization")
      .should("equal", "Bearer e30.e30.e2e-signature");
    cy.contains("Tournament deleted!").should("be.visible");
    cy.contains("No Tournaments").should("be.visible");
  });

  it("keeps the result and lets the creator retry after a failed request", () => {
    cy.intercept("DELETE", "**/api/v1/tournament/28", {
      statusCode: 500,
    }).as("deleteTournament");
    cy.on("window:confirm", () => true);

    visitAsCreator(creatorId);
    cy.wait("@getHistory");
    cy.get('button[aria-label="Delete OHC Cup"]').click();

    cy.wait("@deleteTournament");
    cy.contains("OHC Cup").should("be.visible");
    cy.get('button[aria-label="Delete OHC Cup"]')
      .should("be.visible")
      .and("be.enabled");
    cy.contains("Could not delete tournament. Please try again.").should(
      "be.visible"
    );
  });
});
