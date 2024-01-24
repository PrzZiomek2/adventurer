Cypress.Commands.add("sessionLogin", () => {
   cy.intercept("api/auth/session", { fixture: "session.json" }).as("session");

   cy.setCookie("next-auth.session-token", Cypress.env("session_token"));

   cy.visit("/");
   cy.wait("@session");
});

Cypress.Commands.add("postAPI", ({ url, body }) => {
   return cy.request({
      url,
      method: "POST",
      failOnStatusCode: false,
      body,
   });
});

export {};
declare global {
   namespace Cypress {
      interface Chainable {
         sessionLogin: () => Chainable<void>;
         postAPI: <T>(body: {
            url: string;
            body: RequestBody;
         }) => Chainable<Response<T>>;
      }   
   }
   interface UserResponse {
      message: string;
      user: RegisterFormValues;
      status: number;
   }   
}
