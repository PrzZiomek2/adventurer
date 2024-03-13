"use client";
import { useEffect, useState } from "react";
import { PlacesList } from "../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { postServerData } from "app/_utils/handlersApi";
import { getPlacesCoords } from "app/_utils/handlers";
import { MapPlacesContainer } from "../parts/MapPlacesContainer";

export const PlacesWorld = () => {
   const [clickedPlace, setClickedPlace] = useState("");
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const [placesLoading, setPlacesLoading] = useState(false);

   useEffect(() => {
      const getPlaces = async () => {
         try {
            setPlacesLoading(true);
            const results = await postServerData<
               PlacesApiPostRes & NextResponseBasic
            >("places", {
               phrase: `most interesting and popular tourist places in the world`,
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
   }, []);

   const placesCoords = places && getPlacesCoords(places);

   return (
      <MapPlacesContainer>
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
               center: { lat: 51.919, lng: 19.14 },
               zoom: 1,
            }}
         />
      </MapPlacesContainer>
   );
};
