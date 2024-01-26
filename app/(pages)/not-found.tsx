import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
   return (
       <div>
           <Heading variant="h2">Nie można znalezić strony o podanym adresie</Heading>
           <p> Sprawdź czy adres url jest poprawny</p>
       </div>
   );
}