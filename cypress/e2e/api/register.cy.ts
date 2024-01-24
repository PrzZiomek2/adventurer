
describe("test /api/register", () => {
   let credentials: RegisterFormValues;

   before(() => {
      credentials = {
         email: `${crypto.randomUUID().slice(10)}@.com`,
         password: crypto.randomUUID().slice(10),
         name: "cypress-test",
      };
   });

   it("should register the user if correct data provided", () => {
      cy.postAPI<UserResponse>({
         url: `/api/register`,
         body: credentials,
      })
      .then(({ body }) => {
         const { message, status } = body;
         expect(status).to.equal(201);
         expect(message).to.equal("Rejestracja się udała");
      });
   });

   it("should throw an error if any of the values is missing", () => {
      cy.postAPI<UserResponse>({
         url: `/api/register`,
         body: {
            password: credentials.password,
            name: credentials.name,
         },
      })
      .then(({ body }) => {
         expect(body.status).to.equal(500);
         expect(body.message).to.contain("Uzupełnij wszystkie pola");
      });
   });

   it("should throw an error if user with that email already exists", () => {
      cy.postAPI<UserResponse>({
         url: `/api/register`,
         body: credentials
      })
      .then(({ body }) => {
         expect(body.status).to.equal(500);
         expect(body.message).to.contain("Bład podczas rejestracji: ConditionalCheckFailedException");
      });
   });
});
