"use client";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { GiPositionMarker } from "react-icons/gi";
import { Loader } from "@googlemaps/js-api-loader";

import { Loader as CircleLoader } from "@/components/ui/Loader/Loader";
import { useMap } from "app/_customHooks/useMap";
import { iconToString } from "app/_utils/handlers";

type Coordinates = {
   lat: number;
   lng: number;
};

interface MapProps {
   userLocalized?: boolean;
   places?: PlaceCoords[];
   setClickedPlace: Dispatch<SetStateAction<string>>;
   mapSettings: Record<string, unknown>;
   mainIcon: {
      url: string;
      text: string;
   };
}

export const Map: FC<MapProps> = ({
   places,
   setClickedPlace,
   mapSettings,
   mainIcon,
}) => {
   const mapRef = React.useRef<HTMLDivElement>(null);

   const settings = {
      ...mapSettings,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
   };
   const mainPosition = mapSettings?.center as Coordinates;

   const map = useMap(mapRef.current, settings);

   const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
   });

   useEffect(() => {
      if (!mapRef.current) return;

      let userMarker: google.maps.Marker | null = null;
      const placeMarkers: google.maps.Marker[] = [];

      const initMarkers = async () => {
         try {
            const { Marker } = await loader.importLibrary("marker");

            if (mainPosition) {
               userMarker = new Marker({
                  map,
                  position: mainPosition,
                  icon: {
                     url: mainIcon.url,
                     scaledSize: new window.google.maps.Size(44, 44),
                  },
               });

               const markerInfo = new window.google.maps.InfoWindow({
                  content: mainIcon.text,
               });

               userMarker.addListener("mouseover", () => {
                  markerInfo.open(map, userMarker);
               });
               userMarker.addListener("mouseout", () => {
                  markerInfo.close();
               });
            }

            if (places?.length) {
               places?.forEach((place) => {
                  const { place_id, name, ...coords } = place;
                  const placeMarker = new Marker({
                     map,
                     position: coords,
                     icon: {
                        url: iconToString(GiPositionMarker),
                        scaledSize: new window.google.maps.Size(30, 30),
                     },
                  });

                  const markerInfo = new google.maps.InfoWindow({
                     content: name,
                  });

                  placeMarker.addListener("mouseover", () => {
                     markerInfo.open(map, placeMarker);
                  });
                  placeMarker.addListener("mouseout", () => {
                     markerInfo.close();
                  });
                  placeMarker.addListener("click", () => {
                     setClickedPlace(place_id);
                  });

                  placeMarkers.push(placeMarker);
               });
            }
         } catch (error) {
            console.error(error);
         }
      };

      initMarkers();

      return () => {
         if (userMarker) google.maps.event.clearInstanceListeners(userMarker);
         placeMarkers.forEach((marker) =>
            google.maps.event.clearInstanceListeners(marker),
         );
      };
   }, [mapRef, mainPosition, places]);

   const loadingPlaceholder = (
      <div className="h-full flex justify-center items-center flex-col absolute w-full">
         <CircleLoader label={"Ładowanie mapy..."} />
      </div>
   );

   return (
      <div
         className={`
            min-h-[300px] sm:min-h-[400px] max-h-[500px] max-w-[500px] 
            desktop:max-h-[600px] desktop:max-w-[600px]
            bg-200 w-full rounded-lg mx-auto 2md:ml-0 2md:mr-0 bg-emerald hd:max-w-none
         `}
      >
         <div className="relative max-w-[800px] w-full h-full rounded-lg bg-emerald-200">
            {loadingPlaceholder}
            {!mapRef.current && loadingPlaceholder}
            <div
               className="h-full rounded-lg"
               ref={mapRef}
            />
         </div>
      </div>
   );
};
