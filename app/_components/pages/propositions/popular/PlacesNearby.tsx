"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { Heading } from "@/components/ui/Heading";
import { getServerData } from "app/_utils/handlersApi";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";

export const PlacesNearby = () => {
   const { coords } = useContext(UserLocationContext);
   const [placesData, setPlacesData] = useState<MapPlace[]>([]);
   const [loadingData, setLoadingData] = useState(false);
   const [clickedPlace, setClickedPlace] = useState("");

   const userPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : null;

   const centerPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   useEffect(() => {
      const categories = ["tourist_attraction", "cafe", "bar", "restaurant"]; // TODO: category selection
      const radius = 2000;
      const getPlaces = async () => {
         try {
            setLoadingData(true);
            const placesDataRes = await getServerData<{ data: MapPlace[] }>(
               `places?category=${categories.join("|")}&radius=${radius}&location=${centerPosition.lat},${centerPosition.lng}`,
            );

            if (placesDataRes) {
               setPlacesData(placesDataRes?.data);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setLoadingData(false);
         }
      };

      if (centerPosition.lat && centerPosition.lng) {
         getPlaces();
      }
   }, [centerPosition.lat, centerPosition.lng]);

   const placesCoords =
      placesData &&
      placesData.map(({ geometry, place_id, name }) => ({
         lat: geometry.location.lat,
         lng: geometry.location.lng,
         name,
         place_id,
      }));

   return (
      <>
         <div className="flex flex-col gap-3">
            <Heading
               className="col-span-full"
               variant="h2"
            >
               W okolicy
            </Heading>

            <PlacesList
               clickedPlace={clickedPlace}
               loadingData={loadingData}
               places={placesData}
            />
         </div>
         <Map
            userLocalized
            places={placesCoords}
            setClickedPlace={setClickedPlace}
            mainPosition={userPosition}
         />
      </>
   );
};
