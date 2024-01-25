import { InputTags } from "@/components/common/inputTags/InputTags";

describe("test InputTags component", () => {
   const tagsArr = ["test1", "test2", "test3", "test4"];

   beforeEach(() => {
      cy.mount(
         <InputTags
            tags={tagsArr}
            setTags={() => {}}
            id="test"
         />,
      );
   });

   it("should render InputTags with given number of tags", () => {
      cy.get('[data-cy="tag"]').should("have.length", tagsArr.length);
   });
});
