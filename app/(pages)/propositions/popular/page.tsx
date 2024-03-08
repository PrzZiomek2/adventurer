import React, { useState } from "react";

import { PlacesNearby } from "@/components/pages/propositions/popular/PlacesNearby";

function PropositionsPopular() {
   return (
      <main
         className={`
            card  mt-0 sm:mt-6 lg:mt-8
            grid min-h-[600px] lg:grid-cols-[auto_500px] 
            hd:grid-cols-[auto_600px] 
            grid-cols-1 gap-4 wide:gap-[40px] wide:grid-cols-[1fr_1fr] 
         `}
      >
         <PlacesNearby />
      </main>
   );
}

export default PropositionsPopular;
