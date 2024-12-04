import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
   return (
      <main className="mt-24 flex flex-col items-center gap-6">
         <Heading
            className="text-center text-black text-3xl"
            variant="h2"
         >
            Nie można znaleźć strony o podanym adresie
         </Heading>
         <p className="text-2xl"> Sprawdź czy adres url jest poprawny</p>
      </main>
   );
}
