"use client";
import { useEffect, useState } from "react";
import { PlacesList } from "../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { postServerData } from "app/_utils/handlersApi";
import { getPlacesCoords } from "app/_utils/handlers";
import { MapPlacesContainer } from "../parts/MapPlacesContainer";
import Select from "@/components/ui/Select";

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

   const options = [
      { value: "Africa", label: "Afryka" },
      { value: "Asia", label: "Azja" },
      { value: "Europe", label: "Europa" },
      { value: "Australia andOceania", label: "Australia i Oceania" },
      { value: "South America", label: "Ameryka Południowa" },
      { value: "Northern Africa", label: "Afryka Północna" },
      { value: "Western Africa", label: "Afryka Zachodnia" },
      { value: "Northern America", label: "Ameryka Północna" },
      { value: "Central America", label: "Ameryka Środkowa" },
      { value: "Caribbean", label: "Karaiby" },
      { value: "South America", label: "Ameryka Południowa" },
      { value: "Central Asia", label: "Azja Środkowa" },
      { value: "Souteast Asia", label: "Azja Południowo-Wschodnia" },
      { value: "Middle East", label: "Bliski Wschód" },
   ];

   return (
      <MapPlacesContainer>
         {/*   TO DO: styloe region select
       <Select
            options={options}
            value={currentRegion}
            onChange={(value) => setCurrentRegion(value)}
            ariaLabel="wybierz kontynent / region"
         /> */}
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
               zoom: 3,
            }}
         />
      </MapPlacesContainer>
   );
};
