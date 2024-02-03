import Header from "@/components/common/Header/Header";
import { Container } from "@/components/ui/Container";
import React from "react";

interface Params {
   params: {
      userId: string;
   };
}

async function PropositionsUser({ params }: Params) {
   return (
      <>
         <Header />
         <main>
            <Container>
               <p></p>
            </Container>
         </main>
      </>
   );
}

export default PropositionsUser;
