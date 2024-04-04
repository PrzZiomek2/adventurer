"use client";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { GiPositionMarker } from "react-icons/gi";
import { Loader } from "@googlemaps/js-api-loader";

import { Loader as CircleLoader } from "@/components/ui/Loader/Loader";
import { useMap } from "app/_customHooks/useMap";
import { iconToString } from "app/_utils/handlers";

interface MapProps {
   userLocalized?: boolean;
   places?: PlaceCoords[];
   setClickedPlace?: Dispatch<SetStateAction<string>>;
   mapSettings: Record<string, unknown>;
   mainIcon?: {
      url: string;
      text: string;
      size?: [number, number];
   } | null;
}

export const Map: FC<MapProps> = ({
   places,
   setClickedPlace,
   mapSettings,
   mainIcon,
}) => {
   const mapRef = React.useRef<HTMLDivElement>(null);
   const mainPosition = mapSettings?.center as Coords;

   const map = useMap(mapRef.current, mapSettings);

   const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
   });

   useEffect(() => {
      if (!map) return;

      let mainMarker: google.maps.Marker | null = null;

      const initMarker = async () => {
         try {
            const { Marker } = await loader.importLibrary("marker");
            if (mainPosition?.lat && mainPosition?.lng && mainIcon) {
               const mainMarkerSize = mainIcon?.size || [44, 44];
               mainMarker = new Marker({
                  map,
                  position: mainPosition,
                  icon: {
                     url: mainIcon?.url,
                     scaledSize: new window.google.maps.Size(
                        mainMarkerSize[0],
                        mainMarkerSize[1],
                     ),
                  },
               });

               const markerInfo = new window.google.maps.InfoWindow({
                  content: mainIcon?.text,
               });

               mainMarker.addListener("mouseover", () => {
                  markerInfo.open(map, mainMarker);
               });
               mainMarker.addListener("mouseout", () => {
                  markerInfo.close();
               });
            }
         } catch (error) {
            console.error(error);
         }
      };

      initMarker();

      return () => {
         if (mainMarker) google.maps.event.clearInstanceListeners(mainMarker);
      };
   }, [mainPosition, mainIcon, map]);

   useEffect(() => {
      const placeMarkers: google.maps.Marker[] = [];
      const initPlaceMarkers = async () => {
         try {
            const { Marker } = await loader.importLibrary("marker");

            if (places?.length && placeMarkers.length) {
               placeMarkers.forEach((marker, i) => {
                  marker.setMap(null);
               });
            }

            if (places?.length && placeMarkers.length === 0) {
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
                     setClickedPlace && setClickedPlace(place_id);
                     markerInfo.close();
                  });

                  placeMarkers.push(placeMarker);
               });
            }
         } catch (error) {
            console.error(error);
         }
      };

      initPlaceMarkers();

      return () => {
         placeMarkers.forEach((marker) =>
            google.maps.event.clearInstanceListeners(marker),
         );
      };
   }, [places]);

   useEffect(() => {
      if (map && mapSettings?.center && mapSettings?.zoom) {
         map.setZoom(mapSettings.zoom as number);
         map.panTo(mapSettings.center as google.maps.LatLng);
      }
   }, [mapSettings.center, mapSettings.zoom, map]);

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
