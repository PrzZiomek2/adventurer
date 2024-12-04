"use client";
import { useEffect, useState } from "react";
import { PlacesList } from "../../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { postServerData } from "app/_utils/handlersApi";
import { getPlacesCoords } from "app/_utils/handlers";
import { MapPlacesContainer } from "../../parts/MapPlacesContainer";
import { PlacesWorldOptions } from "./parts/PlacesWorldOptions";
import regions from "../../../../../../public/data/regions.json";

export const PlacesWorld = () => {
   const [clickedPlace, setClickedPlace] = useState("");
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const [placesLoading, setPlacesLoading] = useState(false);
   const [currentRegion, setCurrentRegion] = useState("Western Europe");

   useEffect(() => {
      const getPlaces = async () => {
         try {
            setPlacesLoading(true);
            const results = await postServerData<
               PlacesApiPostRes & NextResponseBasic
            >("places", {
               phrase: `most popular tourist attractions in the ${currentRegion}`,
            });
            if (results.data) {
               const filteredPlaces = results.data?.places.filter(
                  ({ types }) => !types.includes("amusement_park"),
               );
               setPlaces(filteredPlaces);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setPlacesLoading(false);
         }
      };

      getPlaces();
   }, [currentRegion]);

   const handlePlaceClick = (place: PlaceCoords) => {
      const { name, id } = place;
      if (!id) return;
      setClickedPlace(id);
      postServerData("click-tracking", {
         name,
         id,
         click_location: "map",
         place_type: "world",
      });
   };

   const placesCoords = places && getPlacesCoords(places);
   const regionCoords = regions.find(
      (region) => region.value === currentRegion,
   );

   return (
      <MapPlacesContainer>
         <PlacesWorldOptions
            currentRegion={currentRegion}
            setCurrentRegion={setCurrentRegion}
         />
         <PlacesList
            clickedPlace={clickedPlace}
            places={places}
            loadingData={placesLoading}
            placeType="world"
         />
         <Map
            userLocalized
            places={placesCoords}
            placeClickHandler={handlePlaceClick}
            mapSettings={{
               center: regionCoords?.coordinates,
               zoom: 3,
            }}
         />
      </MapPlacesContainer>
   );
};
