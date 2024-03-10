"use client";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GiPositionMarker } from "react-icons/gi";
import { MdPersonPinCircle } from "react-icons/md";

import { Loader as CircleLoader } from "@/components/ui/Loader/Loader";
import { renderToStaticMarkup } from "react-dom/server";

interface MapProps {
   mainPosition: {
      lat: number;
      lng: number;
   } | null;
   userLocalized?: boolean;
   places?: { lat: number; lng: number; place_id: string; name: string }[];
   setClickedPlace: Dispatch<SetStateAction<string>>;
}

export const Map: FC<MapProps> = ({
   mainPosition,
   places,
   setClickedPlace,
}) => {
   const mapRef = React.useRef<HTMLDivElement>(null);
   const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
   });

   const mapSettings = {
      center: mainPosition || { lat: 52.4, lng: 16.9 },
      zoom: 12,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
   };

   useEffect(() => {
      if (!mapRef.current) return;

      let userMarker: google.maps.Marker | null = null;
      const placeMarkers: google.maps.Marker[] = [];

      const initMap = async () => {
         const { Marker } = await loader.importLibrary("marker");
         const { Map } = await loader.importLibrary("maps");
         const map = new Map(mapRef.current as HTMLDivElement, mapSettings);

         if (mainPosition) {
            const personIconUrl = `data:image/svg+xml;utf-8,${encodeURIComponent(
               renderToStaticMarkup(<MdPersonPinCircle />),
            )}`;

            userMarker = new Marker({
               map,
               position: mainPosition,
               icon: {
                  url: personIconUrl,
                  scaledSize: new google.maps.Size(44, 44),
               },
            });

            const markerInfo = new google.maps.InfoWindow({
               content: "Ty",
            });

            userMarker.addListener("mouseover", () => {
               markerInfo.open(map, userMarker);
            });
            userMarker.addListener("mouseout", () => {
               markerInfo.close();
            });
         }

         if (places?.length) {
            const placeIconUrl = `data:image/svg+xml;utf-8,${encodeURIComponent(
               renderToStaticMarkup(<GiPositionMarker />),
            )}`;

            places?.forEach((place) => {
               const { place_id, name, ...coords } = place;
               const placeMarker = new Marker({
                  map,
                  position: coords,
                  icon: {
                     url: placeIconUrl,
                     scaledSize: new google.maps.Size(30, 30),
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
      };

      initMap();

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
