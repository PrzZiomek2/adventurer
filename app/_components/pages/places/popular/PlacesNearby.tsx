"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { MdPersonPinCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { getPlacesCoords, iconToString } from "app/_utils/handlers";
import { getServerData } from "app/_utils/handlersApi";
import { MapPlacesContainer } from "../parts/MapPlacesContainer";

export const PlacesNearby = () => {
   const { coords } = useContext(UserLocationContext);
   const [clickedPlace, setClickedPlace] = useState("");
   const [placesLoading, setPlacesLoading] = useState(false);
   const [places, setPlaces] = useState<MapPlace[]>([]);

   const userPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : null;

   useEffect(() => {
      const getPlaces = async () => {
         try {
            setPlacesLoading(true);
            const categories = [
               "tourist_attraction",
               "point_of_interest",
               "natural_feature",
               "museum",
            ]; // TODO: category selection
            const radius = 5000;
            const results = await getServerData<{ data: MapPlace[] }>(
               `places?category=${categories.join("|")}&radius=${radius}&location=${userPosition?.lat},${userPosition?.lng}`,
            );
            if (results.data) {
               setPlaces(results.data);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setPlacesLoading(false);
         }
      };

      if (userPosition) {
         getPlaces();
      }
   }, [userPosition?.lat, userPosition?.lng]);

   const placesCoords = places && getPlacesCoords(places);
   const noUserLocalizationInfo = (
      <div className="h-full px-12 flex text-lg justify-center items-center text-center">
         Bez udostępnionej lokalizacji nie można pokazać miejsc w pobliżu,
         sprawdź pozostałe sekcje
      </div>
   );

   return (
      <MapPlacesContainer>
         {userPosition && !placesLoading ? (
            <PlacesList
               clickedPlace={clickedPlace}
               loadingData={placesLoading}
               places={places}
            />
         ) : (
            noUserLocalizationInfo
         )}
         <Map
            userLocalized
            places={placesCoords}
            setClickedPlace={setClickedPlace}
            mapSettings={{
               center: userPosition || { lat: 52.4, lng: 16.9 },
               zoom: 13,
            }}
            mainIcon={
               userPosition && {
                  url: iconToString(MdPersonPinCircle),
                  text: "Jesteś tutaj",
               }
            }
         />
      </MapPlacesContainer>
   );
};
