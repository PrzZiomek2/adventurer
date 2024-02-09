import React, { useState } from "react";

import { PlacesNearby } from "@/components/pages/propositions/popular/PlacesNearby";

function PropositionsPopular() {
   return (
      <main
         className={`card sm:mt-12 min-h-[600px] grid desktop:grid-cols-[auto_600px] grid-cols-1 gap-4
      `}
      >
         <PlacesNearby />
      </main>
   );
}

export default PropositionsPopular;
