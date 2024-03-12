import { getServerData } from "app/_utils/handlersApi";
import { useEffect, useState } from "react";

export const useGooglePlacesList = (
   centerPosition: Coords,
   categories: string[],
   radius: number,
): {
   placesData: MapPlace[];
   placesCoords: PlaceCoords[];
   loadingData: boolean;
} => {
   const [placesData, setPlacesData] = useState<MapPlace[]>([]);
   const [loadingData, setLoadingData] = useState(false);

   useEffect(() => {
      const getPlaces = async () => {
         try {
            setLoadingData(true);
            const placesDataRes = await getServerData<{ data: MapPlace[] }>(
               `places?category=${categories.join("|")}&radius=${radius}&location=${centerPosition.lat},${centerPosition.lng}`,
            );

            if (placesDataRes) {
               setPlacesData(placesDataRes?.data);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setLoadingData(false);
         }
      };

      if (centerPosition.lat && centerPosition.lng) {
         getPlaces();
      }
   }, [centerPosition.lat, centerPosition.lng]);

   const placesCoords =
      placesData &&
      placesData.map(({ geometry, place_id, name }) => ({
         lat: geometry.location.lat,
         lng: geometry.location.lng,
         name,
         place_id,
      }));

   return { placesData, placesCoords, loadingData };
};
