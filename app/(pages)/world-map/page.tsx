"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { Loader as CircleLoader } from "@/components/ui/Loader/Loader";
import { postServerData } from "app/_utils/handlersApi";

export default function WorldMap() {
   const mapRef = React.useRef<HTMLDivElement | null>(null);
   const [map, setMap] = useState<google.maps.Map>();
   const mapSettings = {
      center: { lat: 52.4, lng: 16.9 },
      zoom: 12,
   };

   const loader = useMemo(
      () =>
         new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
            version: "weekly",
         }),
      [],
   );

   useEffect(() => {
      const fetchMap = async () => {
         try {
            const { Map } = await loader.importLibrary("maps");
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
   }, [mapRef, mapSettings, loader]);

   const loadingPlaceholder = (
      <div className="h-full flex justify-center items-center flex-col absolute w-full">
         <CircleLoader label={"Ładowanie mapy..."} />
      </div>
   );

   useEffect(() => {
      const loadMarkers = async () => {
         const { AdvancedMarkerElement } = await loader.importLibrary("marker");
         const marker = new AdvancedMarkerElement({
            map,
            position: mapSettings.center,
         });
      };
      if (map && mapSettings?.center) {
         loadMarkers();
      }
   }, [map]);

   const getWorldPlaces = async (bounds: google.maps.LatLngBounds) => {
      try {
         const results = await postServerData<
            PlacesApiPostRes & NextResponseBasic
         >("world-map/places", bounds);
         if (results?.data) {
            console.log(results.data);
         }
      } catch (err) {
         console.log("error when getting world map places");
      }
   };

   useEffect(() => {
      if (!map) return;

      const handleMapIdle = () => {
         const bounds = map.getBounds();
         if (!bounds) return;
         getWorldPlaces(bounds);
      };

      const mapLoadListener = map.addListener("idle", handleMapIdle);

      return () => {
         if (mapLoadListener) {
            google.maps.event.removeListener(mapLoadListener);
         }
      };
   }, [map]);

   return (
      <main
         className={`
             h-full min-h-[800px] p-0 m-0 w-[calc(100vw_-_10px)] 
             -ml-[27px] bg-blend
        `}
      >
         {!mapRef.current && loadingPlaceholder}
         <div
            className="h-full rounded-lg min-h-[800px]"
            ref={mapRef}
         />
      </main>
   );
}
