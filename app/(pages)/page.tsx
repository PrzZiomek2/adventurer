import Header from "@/components/common/Header/Header";
import CriteriaForm from "@/components/pages/main/CriteriaForm";
import { IntroCard } from "@/components/pages/main/IntroCard";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

export default function Home() {
   return (
      <main className="mx-auto flex justify-center gap-10">
         <IntroCard />
         <CriteriaForm />
      </main>
   );
}
