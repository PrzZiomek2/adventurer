"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { MdPersonPinCircle } from "react-icons/md";
import { useContext, useState } from "react";
import { PlacesList } from "../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { iconToString } from "app/_utils/handlers";
import { useGooglePlacesList } from "app/_customHooks/useGooglePlacesList";

export const PlacesNearby = () => {
   const { coords } = useContext(UserLocationContext);
   const [clickedPlace, setClickedPlace] = useState("");

   const userPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : null;
   const categories = ["tourist_attraction", "cafe", "bar", "restaurant"]; // TODO: category selection
   const centerPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   const { placesCoords, placesData, loadingData } = useGooglePlacesList(
      centerPosition,
      categories,
      3000,
   );

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
            mapSettings={{
               center: userPosition || { lat: 52.4, lng: 16.9 },
               zoom: 13,
            }}
            mainIcon={{
               url: iconToString(MdPersonPinCircle),
               text: "Ty",
            }}
         />
      </div>
   );
};
