import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";

export const useMap = (
   mapRef: HTMLDivElement | null,
   settings: Record<string, unknown>,
): google.maps.Map | undefined => {
   const [map, setMap] = useState<google.maps.Map>();

   const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
   });

   useEffect(() => {
      const fetchMap = async () => {
         try {
            const mapSettings = {
               ...settings,
               mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
            };
            const { Map } = await loader.importLibrary("maps");
            const map = new Map(mapRef as HTMLDivElement, mapSettings);
            setMap(map);
         } catch (err) {
            console.log(err);
         }
      };

      if (mapRef && !map) {
         fetchMap();
      }
   }, [mapRef, settings, loader]);

   return map;
};
