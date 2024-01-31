import Header from "@/components/common/Header/Header";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
   return (
      <>
         <Header />
         <main>
            <Container>
               <Heading variant="h2">
                  Nie można znalezić strony o podanym adresie
               </Heading>
               <p> Sprawdź czy adres url jest poprawny</p>
            </Container>
         </main>
      </>
   );
}
