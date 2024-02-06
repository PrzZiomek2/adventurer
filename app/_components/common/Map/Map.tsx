"use client";
import React, { FC, useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import { Loader } from "@/components/ui/Loader";

interface MapProps {
   position?: {
      lat: number;
      lng: number;
   };
   userLocalized?: boolean;
}

export const Map: FC<MapProps> = ({
   position = { lat: 52.4, lng: 16.9 },
   userLocalized = false,
}) => {
   const [userPosition, setUserPosition] = useState<
      GeolocationPosition | undefined
   >();

   useEffect(() => {
      const getUserLocation = async () => {
         navigator.geolocation.getCurrentPosition((position) =>
            setUserPosition(position),
         );
      };
      if (userLocalized) {
         getUserLocation();
      }
   }, [userLocalized]);

   const mapContainerStyle = {
      maxWidth: "900px",
      width: "100%",
      height: "100%",
      borderRadius: "0.5rem",
   };

   const loadingPlaceholder = (
      <div className="h-full flex justify-center items-center flex-col ">
         <Loader label={"Wczytywanie mapy..."} />
      </div>
   );

   return (
      <div className="bg-emerald-200 w-full rounded-lg mt-3">
         <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
            loadingElement={loadingPlaceholder}
         >
            <GoogleMap
               mapContainerStyle={mapContainerStyle}
               center={
                  userPosition
                     ? {
                          lat: userPosition.coords.latitude,
                          lng: userPosition.coords.longitude,
                       }
                     : position
               }
               zoom={12}
            />
         </LoadScript>
      </div>
   );
};
