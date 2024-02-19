"use client";
import { Map } from "@/components/common/Map/Map";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { Heading } from "@/components/ui/Heading";
import { getServerData } from "app/_utils/handlersApi";
import { useContext, useEffect, useState } from "react";

export const PlacesNearby = () => {
   const userPosition = useContext(UserLocationContext);
   const [placesData, setPlacesData] = useState<MapPlace[]>([]);

   const centerPosition = userPosition
      ? {
           lat: userPosition.latitude,
           lng: userPosition.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   useEffect(() => {
      // TODO: complete in second release
      return;
      const categories = ["tourist_attraction", "cafe", "bar", "restaurant"]; // TODO: category selection
      const getPlaces = async () => {
         const placesDataRes = await getServerData<{ data: MapPlace[] }>(
            `places?category=${categories.join("|")}&radius=1000&location=${centerPosition.lat},${centerPosition.lng}`,
         );

         if (placesDataRes) {
            setPlacesData(placesDataRes?.data);
         }
      };

      if (centerPosition.lat && centerPosition.lng) {
         getPlaces();
      }
   }, [centerPosition.lat, centerPosition.lng]);

   console.log({ placesData });

   return (
      <>
         <div className="flex flex-col gap-6 order-2 lg:-order-1">
            <Heading
               className="col-span-full"
               variant="h2"
            >
               W okolicy
            </Heading>
         </div>
         <Map
            userLocalized
            position={centerPosition}
         />
      </>
   );
};
