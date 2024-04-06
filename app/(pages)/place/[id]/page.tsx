"use client";
import React, { useEffect, useState } from "react";
import { Map } from "@/components/common/Map/Map";
import { PlaceDetails } from "@/components/pages/place/PlaceDetails";
import { getServerData } from "app/_utils/handlersApi";
import { iconToString } from "app/_utils/handlers";
import { GiPositionMarker } from "react-icons/gi";
import { Heading } from "@/components/ui/Heading";

interface Params {
   params: {
      id: string;
   };
}

function PropositionsUser({ params }: Params) {
   const placeId = params.id;
   const [details, setDetails] = useState<PlaceDetails>();
   const [errorMsg, setErrorMsg] = useState<string>();

   useEffect(() => {
      const getDetails = async () => {
         try {
            const res = await getServerData<{ data: PlaceDetails }>(
               `place/${placeId}`,
            );

            if (res?.data) {
               setDetails(res?.data);
            }
         } catch (error) {
            setErrorMsg("Nie znaleziono pozycji");
         }
      };

      if (placeId) {
         getDetails();
      }
   }, [placeId]);

   if (errorMsg) {
      return <div>Nie znaleziono pozycji</div>;
   }

   const { name, geometry } = details || {};

   return (
      <main
         className={`
            grid 2md:grid-cols-[3fr_2fr] grid-rows-[50px_1fr_1fr] 2md:grid-rows[50px _auto]
            gap-5 card mt-0 sm:mt-6 lg:mt-8 min-h-[500px] wide:min-h-[600px]
        `}
      >
         <Heading
            variant="h2"
            className="col-span-full"
         >
            {name}
         </Heading>
         <PlaceDetails details={details} />
         <Map
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
         />
      </main>
   );
}

export default PropositionsUser;
