"use client";
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
      <div>
         <Heading variant="h2">Przepraszamy, wystapil blad serwera. </Heading>
         <button onClick={() => reset()}>Ponów</button>
      </div>
   );
}
