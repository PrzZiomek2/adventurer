"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { MdPersonPinCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { getPlacesCoords, iconToString } from "app/_utils/handlers";
import { getServerData, postServerData } from "app/_utils/handlersApi";
import { MapPlacesContainer } from "../../parts/MapPlacesContainer";
import { PlacesNearbyOptions } from "./parts/PlacesNearbyOptions";
import { useTranslations } from "next-intl";

export const PlacesNearby = () => {
   const t = useTranslations("suggestions");
   const { coords, loading: userLocationLoading } =
      useContext(UserLocationContext);
   const [clickedPlace, setClickedPlace] = useState("");
   const [placesLoading, setPlacesLoading] = useState(false);
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const [categories, setCategories] = useState([
      "landmark",
      "theater",
      "night_club",
      "museum",
      "hiking_trail",
      "cafe",
      "historical_site",
      "monument",
   ]);

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
            const radius = 6000;
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
   }, [userPosition?.lat, userPosition?.lng, categories]);

   const handlePlaceClick = (place: PlaceCoords) => {
      const { name, id } = place;
      if (!id) return;
      setClickedPlace(id);
      postServerData("click-tracking", {
         name,
         id,
         click_location: "map",
         place_type: "nearby",
      });
   };

   const placesCoords = places && getPlacesCoords(places);
   const noUserLocalizationInfo = (
      <div className="h-full px-12 flex text-lg justify-center items-center text-center">
         {t("userLocation")}
      </div>
   );

   return (
      <MapPlacesContainer>
         <PlacesNearbyOptions
            setCategories={setCategories}
            categories={categories}
         />
         {userPosition && !userLocationLoading ? (
            <PlacesList
               clickedPlace={clickedPlace}
               loadingData={placesLoading}
               places={places}
               placeType="nearby"
            />
         ) : (
            noUserLocalizationInfo
         )}
         <Map
            userLocalized
            places={placesCoords}
            placeClickHandler={handlePlaceClick}
            mapSettings={{
               center: userPosition || { lat: 52.4, lng: 16.9 },
               zoom: 12,
            }}
            mainIcon={
               userPosition && {
                  url: iconToString(MdPersonPinCircle),
                  text: t("you"),
               }
            }
         />
      </MapPlacesContainer>
   );
};
