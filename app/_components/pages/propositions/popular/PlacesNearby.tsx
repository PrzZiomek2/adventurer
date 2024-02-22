"use client";
import { Map } from "@/components/common/Map/Map";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { Heading } from "@/components/ui/Heading";
import { getServerData } from "app/_utils/handlersApi";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../parts/PlacesList";

export const PlacesNearby = () => {
   const { coords } = useContext(UserLocationContext);
   const [placesData, setPlacesData] = useState<MapPlace[]>([]);

   const centerPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   useEffect(() => {
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

   const placesCoords =
      placesData &&
      placesData.map(({ geometry, place_id }) => ({
         lat: geometry.location.lat,
         lng: geometry.location.lng,
         place_id,
      }));

   return (
      <>
         <div className="flex flex-col gap-6">
            <Heading
               className="col-span-full"
               variant="h2"
            >
               W okolicy
            </Heading>
            <PlacesList places={placesData} />
         </div>
         <Map
            userLocalized
            position={centerPosition}
         />
      </>
   );
};
