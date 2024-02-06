import React, { useState } from "react";

import { PlacesNearby } from "@/components/pages/propositions/popular/PlacesNearby";

function PropositionsPopular() {
   return (
      <main className="card sm:mt-12 min-h-[80vh] grid grid-cols-1 desktop:grid-cols-2 gap-4">
         <PlacesNearby />
      </main>
   );
}

export default PropositionsPopular;
