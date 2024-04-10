"use client";
import React, { useEffect, useState } from "react";
import { Map } from "@/components/common/Map/Map";
import { PlaceOpinionList } from "@/components/pages/place/PlaceOpinionList";
import { getServerData } from "app/_utils/handlersApi";
import { iconToString } from "app/_utils/handlers";
import { GiPositionMarker } from "react-icons/gi";
import { Heading } from "@/components/ui/Heading";
import { PlaceInfo } from "@/components/pages/place/PlaceInfo";

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
            gap-5 card mt-0 sm:mt-6 lg:mt-8 min-h-[500px] wide:min-h-[600px]
        `}
      >
         <Heading
            variant="h2"
            className="mb-4"
         >
            {name}
         </Heading>
         <div className="grid 2md:flex gap-0 2md:gap-8">
            <PlaceOpinionList details={details} />
            <div className="flex flex-col gap-5 w-full">
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
               <PlaceInfo details={details} />
            </div>
         </div>
      </main>
   );
}

export default PropositionsUser;
