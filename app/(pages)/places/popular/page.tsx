import React from "react";

import { PlacesNearby } from "@/components/pages/places/popular/PlacesNearby";
import Tabs from "@/components/common/Tabs/Tabs";
import { Heading } from "@/components/ui/Heading";
import { PlacesCountry } from "@/components/pages/places/popular/PlacesCountry";
import { PlacesWorld } from "@/components/pages/places/popular/PlacesWorld";

function PropositionsPopular() {
   const getHeader = (text: string) => {
      return (
         <Heading
            className={`
               col-span-full text-inherit 
               leading-[1] whitespace-nowrap
            `}
            variant="h2"
         >
            {text}
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
                  tab: getHeader("W pobliżu"),
                  panel: <PlacesNearby />,
               },
               {
                  tab: getHeader("W kraju"),
                  panel: <PlacesCountry />,
               },
               {
                  tab: getHeader("Na świecie"),
                  panel: <PlacesWorld />,
               },
            ]}
         />
      </main>
   );
}

export default PropositionsPopular;
