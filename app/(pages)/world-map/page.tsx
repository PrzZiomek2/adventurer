"use client";
import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import { postServerData } from "app/_utils/handlersApi";
import { hereAPI } from "app/_utils/hereApi";
import { useMapMarkers } from "app/_customHooks/useMapMarkers";
import { getMapLoader } from "app/_lib/mapLoader";
import { Loader } from "@/components/ui/Loader/Loader";

export default function WorldMap() {
   const mapRef = React.useRef<HTMLDivElement | null>(null);
   const [map, setMap] = useState<google.maps.Map>();
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const mapSettings = {
      center: { lat: 52.4, lng: 16.9 },
      zoom: 6,
   };

   useMapMarkers(
      map,
      places.map((place) => place.geometry.location),
   );

   useEffect(() => {
      const fetchMap = async () => {
         try {
            const { Map } = await getMapLoader().importLibrary("maps");
            const map = new Map(mapRef.current!, {
               ...mapSettings,
               mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
            });
            setMap(map);
         } catch (err) {
            console.log(err);
         }
      };

      if (mapRef.current && !map) {
         fetchMap();
      }
   }, [mapRef, mapSettings]);

   const loadingPlaceholder = (
      <div className="h-full flex justify-center items-center flex-col absolute w-full">
         <Loader label={"Ładowanie mapy..."} />
      </div>
   );

   const fetchPlaces = async (name: string) => {
      if (!name) return;
      const results = await postServerData<
         PlacesApiPostRes & NextResponseBasic
      >("places", {
         phrase: `most interesting and popular tourist places in ${name}`,
         regionName: name,
      });
      if (results.data) {
         setPlaces([...results.data.places]);
      }
   };

   useEffect(() => {
      if (!map) return;

      const handleMapChange = async () => {
         const center = map.getCenter();
         if (!center) return;
         const coords = {
            lat: center.lat(),
            lng: center.lng(),
         };
         const decodeRes = await hereAPI.reverseGeocode<CountryRes>(coords);

         if (decodeRes) {
            fetchPlaces(decodeRes?.address.countryName);
         }
      };

      const debouncedMapHandler = debounce(handleMapChange, 1500);

      const mapLoadListener = map.addListener("idle", debouncedMapHandler);
      const centerListener = map.addListener(
         "center_changed",
         debouncedMapHandler,
      );
      const zoomListener = map.addListener("zoom_changed", debouncedMapHandler);

      return () => {
         google.maps.event.removeListener(mapLoadListener);
         google.maps.event.removeListener(centerListener);
         google.maps.event.removeListener(zoomListener);
      };
   }, [map]);

   return (
      <main
         className={`
             h-full min-h-[600px] p-0 m-0 w-[calc(100vw_-_10px)] 
             -ml-[27px] bg-blend
        `}
      >
         {!mapRef.current && loadingPlaceholder}
         <div
            className="h-full rounded-lg min-h-[600px]"
            ref={mapRef}
         />
      </main>
   );
}
