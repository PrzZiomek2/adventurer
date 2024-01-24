
describe("test /api/login", () => {
   let credentials: RegisterFormValues;
   const noUserFound = "Nie znaleziono uzytkownika z podanym hasłem lub email";

   beforeEach(() => {
      cy.fixture("user.json").then((data) => {
         credentials = data;
      });
   });

   it("should log the user in when correct credentials provided", () => {
      cy.postAPI<UserResponse>({
         url: `/api/login`,
         body: {
            email: credentials.email,
            password: credentials.password,
         },
      })
      .then(({ status, body }) => {
         const { message, user } = body;

         expect(status).to.equal(200);
         expect(message).to.equal("Zalogowano");
         expect(user.email).to.equal(credentials.email);
         expect(user.name).to.equal(credentials.name);
      });
   });

   it("should throw an error if db schema key is missing", () => {
      cy.postAPI<UserResponse>({
         url: `/api/login`,
         body: {
            password: credentials.password,
         },
      })
      .then(({ body }) => {
         expect(body.status).to.equal(500);
         expect(body.message).to.contain("Uzupełnij wszystkie pola");
      });
   });

   it("should throw an error if the password is incorrect", () => {
      cy.postAPI<UserResponse>({
         url: `/api/login`,
         body: {
            email: credentials.email,
            password: "xd",
         },
      })
      .then(({ body }) => {
         expect(body.status).to.equal(500);
         expect(body.message).to.contain(noUserFound);
      });
   });

   it("should throw an error if the email is incorrect", () => {
      cy.postAPI<UserResponse>({
         url: `/api/login`,
         body: {
            email: credentials.email + "xd",
            password: credentials.password,
         },
      })
      .then(({ body }) => {
         expect(body.status).to.equal(500);
         expect(body.message).to.contain(noUserFound);
      });
   });
});
