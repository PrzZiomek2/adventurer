import { useEffect, useRef } from "react";
import { getMapLoader } from "app/_lib/mapLoader";
import { renderToStaticMarkup } from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";

type AdvancedMarker = google.maps.marker.AdvancedMarkerElement;

export const useMapMarkers = (
   map: google.maps.Map | undefined,
   coordList: Coords[] | undefined,
   cb: Function | undefined,
): AdvancedMarker[] => {
   const prevMarkersRef = useRef<AdvancedMarker[]>([]);

   const clearMarkers = (markers: AdvancedMarker[]) =>
      markers.forEach((m) => (m.map = null));

   useEffect(() => {
      const loadMarkers = async () => {
         if (prevMarkersRef.current.length) {
            clearMarkers(prevMarkersRef.current);
            prevMarkersRef.current = [];
         }
         const { AdvancedMarkerElement } =
            await getMapLoader().importLibrary("marker");
         coordList?.forEach((coords, i) => {
            const placeMarker = new AdvancedMarkerElement({
               map,
               position: coords,
            });

            const iconEl = new DOMParser().parseFromString(
               renderToStaticMarkup(<GiPositionMarker />),
               "image/svg+xml",
            ).documentElement;

            iconEl.setAttribute("width", "0");
            iconEl.setAttribute("height", "0");

            iconEl.style.transition =
               "width 0.3s ease-out, height 0.3s ease-out";

            placeMarker.content = iconEl;

            setTimeout(() => {
               iconEl.setAttribute("width", "35");
               iconEl.setAttribute("height", "35");
            }, 100);

            placeMarker.content = iconEl;

            if (cb) {
               placeMarker.addListener("click", () => {
                  cb(coordList[i]);
               });
            }

            prevMarkersRef.current.push(placeMarker);
         });
      };
      if (map && coordList?.length) {
         loadMarkers();
      }
   }, [map, coordList]);

   return prevMarkersRef.current;
};
