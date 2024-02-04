import React from "react";

import Tabs from "@/components/common/Tabs/Tabs";

async function PropositionsPopular() {
   return (
      <main>
         <div className="card sm:mt-12 min-h-[700px]">
            <Tabs
               ariaLabel="profil użytkownika"
               items={[
                  {
                     panel: <div>haaaaaaaaaaa</div>,
                     tab: { label: "Niedaleko" },
                  },
                  {
                     panel: <div>eeeeeeeeeee</div>,
                     tab: { label: "Europa" },
                  },
                  {
                     panel: <div>????????????</div>,
                     tab: { label: "świat" },
                  },
               ]}
            />
         </div>
      </main>
   );
}

export default PropositionsPopular;
