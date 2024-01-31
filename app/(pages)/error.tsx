"use client";
import Header from "@/components/common/Header/Header";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { useEffect } from "react";

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <>
         <Header />
         <main>
            <Container>
               <Heading variant="h2">
                  Przepraszamy, wystapil blad serwera.{" "}
               </Heading>
               <button onClick={() => reset()}>Ponów</button>
            </Container>
         </main>
      </>
   );
}
