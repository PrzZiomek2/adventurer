"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { BsFillFlagFill } from "react-icons/bs";
import { iconToString } from "app/_utils/handlers";
import { useGooglePlacesList } from "app/_customHooks/useGooglePlacesList";
import { hereAPI } from "app/_utils/hereApi";
import { postServerData } from "app/_utils/handlersApi";

type CountryRes = {
   address: {
      countryName: string;
      countryCode: string;
   };
};

export const PlacesCountry = () => {
   const { coords } = useContext(UserLocationContext);
   const [clickedPlace, setClickedPlace] = useState("");
   const [countryLocation, setCountryLocation] = useState<Coords>();
   const [countryName, setCountryName] = useState("");

   const centerPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   useEffect(() => {
      const getPlaceName = async () => {
         try {
            const decodeRes =
               await hereAPI.reverseGeocode<CountryRes>(centerPosition);
            if (decodeRes) {
               const name = decodeRes?.address.countryName;
               setCountryName(name);
               const coords = await postServerData<
                  { data: Coords } & NextResponseBasic
               >("places", {
                  name,
               });

               if (coords) {
                  setCountryLocation(coords.data);
               }
            }
         } catch (err) {
            console.log(err);
         }
      };

      if (centerPosition.lat && centerPosition.lng) {
         getPlaceName();
      }
   }, [centerPosition?.lat, centerPosition?.lng]);

   const categories = ["tourist_attraction", "cafe", "bar", "restaurant"]; // TODO: category selection

   const { placesCoords, placesData, loadingData } = useGooglePlacesList(
      countryLocation || centerPosition,
      categories,
      10000,
   );

   return (
      <div
         className={`
            grid min-h-[500px] lg:grid-cols-[auto_500px] 
            hd:grid-cols-[auto_600px] wide:min-h-[600px]
            grid-cols-1 gap-8 lg:gap-4 wide:gap-[40px] wide:grid-cols-[1fr_1fr] 
         `}
      >
         {placesData?.length > 0 && (
            <PlacesList
               clickedPlace={clickedPlace}
               loadingData={loadingData}
               places={placesData}
            />
         )}
         {countryLocation && (
            <Map
               userLocalized
               places={placesCoords}
               setClickedPlace={setClickedPlace}
               mapSettings={{
                  center: countryLocation,
                  zoom: 7,
               }}
               mainIcon={{
                  url: iconToString(BsFillFlagFill),
                  text: countryName,
               }}
            />
         )}
      </div>
   );
};
