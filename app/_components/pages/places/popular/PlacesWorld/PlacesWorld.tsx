"use client";
import { useEffect, useState } from "react";
import { PlacesList } from "../../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { postServerData } from "app/_utils/handlersApi";
import { getPlacesCoords } from "app/_utils/handlers";
import { MapPlacesContainer } from "../../parts/MapPlacesContainer";
import { PlacesOptions } from "./parts/PlacesOptions";
import regions from "../../../../../../public/data/regions.json";

export const PlacesWorld = () => {
   const [clickedPlace, setClickedPlace] = useState("");
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const [placesLoading, setPlacesLoading] = useState(false);
   const [currentRegion, setCurrentRegion] = useState("Europe");

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
               setPlaces(results.data.places);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setPlacesLoading(false);
         }
      };

      getPlaces();
   }, [currentRegion]);

   const placesCoords = places && getPlacesCoords(places);
   const regionCoords = regions.find(
      (region) => region.value === currentRegion,
   );

   return (
      <MapPlacesContainer>
         <PlacesOptions
            currentRegion={currentRegion}
            setCurrentRegion={setCurrentRegion}
         />
         <PlacesList
            clickedPlace={clickedPlace}
            places={places}
            loadingData={placesLoading}
         />
         <Map
            userLocalized
            places={placesCoords}
            setClickedPlace={setClickedPlace}
            mapSettings={{
               center: regionCoords?.coordinates,
               zoom: 3,
            }}
         />
      </MapPlacesContainer>
   );
};
