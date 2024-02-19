"use client";
import React, { FC, createContext, useEffect, useMemo, useState } from "react";

interface UserLocationProviderProps {
   children: React.ReactNode;
}

interface UserLocationContextValue {
   coords: GeolocationCoordinates | null;
   loading: boolean;
   error: Error | null;
}

const userLocationInit = {
   coords: null,
   loading: false,
   error: null,
};

export const UserLocationContext =
   createContext<UserLocationContextValue>(userLocationInit);

export const UserLocationProvider: FC<UserLocationProviderProps> = ({
   children,
}) => {
   const [value, setValue] =
      useState<UserLocationContextValue>(userLocationInit);

   useEffect(() => {
      const getUserLocation = async () => {
         try {
            const position = await new Promise<GeolocationPosition>(
               (resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
               },
            );
            setValue((prev) => ({ ...prev, coords: position.coords }));
         } catch (error) {
            setValue((prev) => ({ ...prev, error: error as Error }));
         } finally {
            setValue((prev) => ({ ...prev, loading: false }));
         }
      };
      getUserLocation();
   }, []);

   const valueMemoized = useMemo(
      () => ({
         coords: value.coords,
         error: value.error,
         loading: value.loading,
      }),
      [value.coords, value.error, value.loading],
   );

   return (
      <UserLocationContext.Provider value={valueMemoized}>
         {children}
      </UserLocationContext.Provider>
   );
};
