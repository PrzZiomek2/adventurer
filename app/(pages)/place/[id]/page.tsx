import React, { useEffect } from "react";
import { Map } from "@/components/common/Map/Map";
import { PlaceDetails } from "@/components/pages/place/PlaceDetails";
import { getServerData } from "app/_utils/handlersApi";
import { iconToString } from "app/_utils/handlers";

interface Params {
   params: {
      id: string;
   };
}

async function PropositionsUser({ params }: Params) {
   const placeId = params.id;

   const res = await getServerData<{ data: PlaceDetails }>(
      `place/${placeId}`,
   ).catch(() => console.log("error when fetching place details"));

   if (!res?.data) {
      return <div>Nie znaleziono pozycji</div>;
   }

   const { name, geometry } = res.data;

   return (
      <main
         className={`
            card mt-0 sm:mt-6 lg:mt-8 min-h-[500px] wide:min-h-[600px]
        `}
      >
         <h2>{name}</h2>
         <PlaceDetails />

         {/* <Map
            mapSettings={{
               center: geometry?.location,
               zoom: 12,
            }}
              mainIcon={
                  geometry && {
                     url: iconToString(GiPositionMarker),
                     text: "",
                  }
               } 
         />*/}
      </main>
   );
}

export default PropositionsUser;
