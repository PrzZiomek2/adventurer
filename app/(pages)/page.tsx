import Header from "@/components/common/Header/Header";
import CriteriaForm from "@/components/pages/main/CriteriaForm";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <Header />
         <main>
            <Container>
               <p></p>
               <CriteriaForm />
            </Container>
         </main>
      </>
   );
}
