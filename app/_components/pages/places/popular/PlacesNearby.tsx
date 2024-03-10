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
      <div
         className={`
            grid min-h-[500px] lg:grid-cols-[auto_500px] 
            hd:grid-cols-[auto_600px] wide:min-h-[600px]
            grid-cols-1 gap-8 lg:gap-4 wide:gap-[40px] wide:grid-cols-[1fr_1fr] 
         `}
      >
         <PlacesList
            clickedPlace={clickedPlace}
            loadingData={loadingData}
            places={placesData}
         />
         <Map
            userLocalized
            places={placesCoords}
            setClickedPlace={setClickedPlace}
            mainPosition={userPosition}
         />
      </div>
   );
};
