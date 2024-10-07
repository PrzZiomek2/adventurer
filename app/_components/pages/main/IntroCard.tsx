import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

export const IntroCard = () => {
   return (
      <div className="card w-full w-max-[600px] -mb-[1px]">
         <Heading variant="h3">Jak to działa?</Heading>
         <p className="my-4">
            Jeśli szukasz inspiracji podróżniczych to trafiłeś w dobre miejsce
            :) Z nami możesz odkrywać nowe miejsca na kilka sposobów:
         </p>
         <ul className="list-none">
            <li className="mb-4">
               <span>
                  - Wchodząc w zakladkę{" "}
                  <Link
                     className="link-basic"
                     href="/world-map"
                  >
                     Mapa
                  </Link>
               </span>
               <p className="my-2">
                  gdzie na mapie świata możesz zobaczyć ciekawe miejsca, które
                  bedą pojawiać się w czasie twojej podróży &quot;palcem po
                  mapie&quot;.
               </p>
            </li>
            <li className="mb-4">
               <span>
                  - Wchodząc w zakladkę{" "}
                  <Link
                     className="link-basic"
                     href="/places/popular"
                  >
                     Propozycje
                  </Link>
               </span>
               <p className="my-2">
                  tam czeka na Ciebie lista miejsc wybranych według najnowszych
                  trendów, podzielona na kategorie.
               </p>
            </li>
            <li>
               <span>
                  - Wpisując swoje preferencje w formularzu po prawej stronie
               </span>
               <p className="my-2">
                  dzięki podaniu informacji o miejscach lubianych, nielubianych
                  oraz porządanych cechach mozemy dostarczyć propozycje
                  dopasowane do Ciebie.
               </p>
            </li>
         </ul>
      </div>
   );
};
