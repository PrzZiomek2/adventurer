"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GiPositionMarker } from "react-icons/gi";

import { Loader as CircleLoader } from "@/components/ui/Loader/Loader";
import { renderToStaticMarkup } from "react-dom/server";

interface MapProps {
   position: {
      lat: number;
      lng: number;
   };
   userLocalized?: boolean;
   places?: MapPlace[];
}

export const Map: FC<MapProps> = ({ position, places }) => {
   const mapRef = React.useRef<HTMLDivElement>(null);

   useEffect(() => {
      const initMap = async () => {
         const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
            version: "weekly",
         });

         const { Map } = await loader.importLibrary("maps");
         const { Marker } = await loader.importLibrary("marker");

         const mapSettings = {
            center: position,
            zoom: 12,
            mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
         };

         const map = new Map(mapRef.current as HTMLDivElement, mapSettings);

         const iconUrl = `data:image/svg+xml;utf-8,${encodeURIComponent(
            renderToStaticMarkup(<GiPositionMarker />),
         )}`;

         new Marker({
            map,
            position,
            icon: {
               url: iconUrl,
               scaledSize: new window.google.maps.Size(44, 44),
            },
         });
      };

      if (mapRef.current) {
         initMap();
      }
   }, [mapRef, position]);

   const loadingPlaceholder = (
      <div className="h-full flex justify-center items-center flex-col absolute w-full">
         <CircleLoader label={"Ładowanie mapy..."} />
      </div>
   );
   console.log("e", mapRef.current);

   return (
      <div
         className={`
            bg-emerald min-h-[300px] sm:min-h-[400px] max-h-[600px] max-w-[600px]
             bg-200 w-full rounded-lg mt-2 mx-auto 2md:ml-0 2md:mr-0
         `}
      >
         <div className="relative max-w-[800px] w-full h-full rounded-lg bg-emerald-200">
            {!mapRef.current && loadingPlaceholder}
            <div
               className="h-full"
               ref={mapRef}
            />
         </div>
      </div>
   );
};
