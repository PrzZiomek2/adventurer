import Header from "@/components/common/Header/Header";
import { Container } from "@/components/ui/Container";
import React from "react";

async function Destinations({ params }) {
   return (
      <>
         <Header />
         <main>
            <Container>
               <p>destinations</p>
            </Container>
         </main>
      </>
   );
}

export default Destinations;
