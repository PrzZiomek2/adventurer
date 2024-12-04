import React from "react";

import { PlacesNearby } from "@/components/pages/places/popular/PlacesNearby/PlacesNearby";
import Tabs from "@/components/common/Tabs/Tabs";
import { Heading } from "@/components/ui/Heading";
import { PlacesCountry } from "@/components/pages/places/popular/PlacesCountry/PlacesCountry";
import { PlacesWorld } from "@/components/pages/places/popular/PlacesWorld/PlacesWorld";
import { useTranslations } from "next-intl";

function PropositionsPopular() {
   const t = useTranslations("suggestions");

   const getHeader = (text: string) => {
      return (
         <Heading
            className={`
               col-span-full text-inherit 
               leading-[1] whitespace-nowrap
            `}
            variant="h2"
         >
            {t(text)}
         </Heading>
      );
   };

   return (
      <main
         className={`
            card mt-0 sm:mt-6 lg:mt-8 min-h-[500px] wide:min-h-[600px]
         `}
      >
         <Tabs
            ariaLabel="Rodzaje propozycji"
            items={[
               {
                  tab: getHeader("nearby"),
                  panel: <PlacesNearby />,
               },
               {
                  tab: getHeader("country"),
                  panel: <PlacesCountry />,
               },
               {
                  tab: getHeader("world"),
                  panel: <PlacesWorld />,
               },
            ]}
         />
      </main>
   );
}

export default PropositionsPopular;
