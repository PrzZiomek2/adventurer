"use client";
import React, { FC, createContext, useEffect, useState } from "react";

interface UserLocationProviderProps {
   children: React.ReactNode;
}

export const UserLocationContext = createContext<GeolocationCoordinates | null>(
   null,
);

export const UserLocationProvider: FC<UserLocationProviderProps> = ({
   children,
}) => {
   const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

   useEffect(() => {
      const getUserLocation = async () => {
         navigator.geolocation.getCurrentPosition((position) =>
            setCoords(position.coords),
         );
      };
      getUserLocation();
   }, []);

   return (
      <UserLocationContext.Provider value={coords}>
         {children}
      </UserLocationContext.Provider>
   );
};
