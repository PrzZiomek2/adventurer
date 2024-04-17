import { MutableRefObject, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { getMapLoader } from "app/_lib/mapLoader";
import { GiPositionMarker } from "react-icons/gi";

type AdvancedMarker = google.maps.marker.AdvancedMarkerElement;

export const useMapMarkers = (
   map: google.maps.Map | undefined,
   coordList: Coords[] | undefined,
): AdvancedMarker[] => {
   const prevMarkersRef = useRef<AdvancedMarker[]>([]);

   const clearMarkers = (markers: AdvancedMarker[]) =>
      markers.forEach((m) => (m.map = null));

   useEffect(() => {
      const loadMarkers = async () => {
         clearMarkers(prevMarkersRef.current);
         const { AdvancedMarkerElement } =
            await getMapLoader().importLibrary("marker");
         coordList?.forEach((coords, i) => {
            setTimeout(() => {
               const placeMarker = new AdvancedMarkerElement({
                  map,
                  position: coords,
               });
               prevMarkersRef.current.push(placeMarker);
            }, i * 100);
         });
      };
      if (map && coordList?.length) {
         loadMarkers();
      }
   }, [map, coordList]);

   return prevMarkersRef.current;
};
