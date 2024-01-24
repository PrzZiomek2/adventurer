describe("test /api/login", () => {
   let credentials: { email: string; password: string };

   beforeEach(() => {
      cy.fixture("user.json").then((data) => {
         credentials = data;
      });
   });

   it("log the user in with given credentials", () => {
      cy.request({
         url: `/api/login`,
         method: "POST",
         body: {
            email: credentials.email,
            password: credentials.password,
         },
      }).then(({ status, body }) => {
         expect(status).to.equal(200);
      });
   });
});
