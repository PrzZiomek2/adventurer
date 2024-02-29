import React, { useState } from "react";

import { PlacesNearby } from "@/components/pages/propositions/popular/PlacesNearby";

function PropositionsPopular() {
   return (
      <main
         className={`
            card  mt-0 sm:mt-6 lg:mt-8
            grid min-h-[600px] desktop2:grid-cols-[auto_400px]  hd:grid-cols-[auto_600px] grid-cols-1 gap-8
         `}
      >
         <PlacesNearby />
      </main>
   );
}

export default PropositionsPopular;
