import { Suspense } from "react";
import CriteriaForm from "@/components/pages/main/CriteriaForm";
import { IntroCard } from "@/components/pages/main/IntroCard";

export default function Home() {
   return (
      <main
         className={`
         mx-auto flex-col md:flex-row flex justify-center mt-0 sm:mt-6 
         sm:gap-4 2md:gap-10 max-w-[1200px]
      `}
      >
         <Suspense>
            <IntroCard />
            <CriteriaForm />
         </Suspense>
      </main>
   );
}
