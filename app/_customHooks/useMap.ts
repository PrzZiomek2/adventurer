import { getMapLoader } from "app/_lib/mapLoader";
import { useEffect, useState } from "react";

export const useMap = (
   mapRef: HTMLDivElement | null,
   settings: Record<string, unknown>,
): google.maps.Map | undefined => {
   const [map, setMap] = useState<google.maps.Map>();

   const mapStyles = [
      {
         featureType: "landscape",
         elementType: "geometry",
         stylers: [{ hue: "#5F4B32" }, { lightness: -15 }],
      },
      {
         featureType: "poi",
         elementType: "labels.text.fill",
         stylers: [{ color: "#000000" }, { visibility: "on" }],
      },
   ];

   useEffect(() => {
      const fetchMap = async () => {
         try {
            const mapSettings = {
               ...settings,
               mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
            };
            const { Map } = await getMapLoader().importLibrary("maps");
            const map = new Map(mapRef as HTMLDivElement, {
               styles: mapStyles,
               ...mapSettings,
            });
            setMap(map);
         } catch (err) {
            console.log(err);
         }
      };

      if (mapRef && !map) {
         fetchMap();
      }
   }, [mapRef, settings]);

   return map;
};
