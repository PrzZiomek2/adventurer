import React from "react";
import Register from "../../app/(pages)/register/page";

describe("<Register />", () => {
   it("renders", () => {
      cy.mount(<Register />);
   });
});
