export {};
declare global {
   namespace Cypress {
      interface Chainable {
         sessionLogin: () => Chainable<void>;
      }
   }
}

Cypress.Commands.add("sessionLogin", () => {
   cy.intercept("api/auth/session", { fixture: "session.json" }).as("session");

   cy.setCookie("next-auth.session-token", Cypress.env("session_token"));

   cy.visit("/");
   cy.wait("@session");
});
