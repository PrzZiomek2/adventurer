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
         clearMarkers(prevMarkersRef.current);
         const { AdvancedMarkerElement } =
            await getMapLoader().importLibrary("marker");
         coordList?.forEach((coords, i) => {
            setTimeout(() => {
               const placeMarker = new AdvancedMarkerElement({
                  map,
                  position: coords,
               });
               const markerInfo = new google.maps.InfoWindow({
                  content: "place.name",
               });

               const iconEl = new DOMParser().parseFromString(
                  renderToStaticMarkup(<GiPositionMarker />),
                  "image/svg+xml",
               ).documentElement;
               iconEl.setAttribute("width", "35");
               iconEl.setAttribute("height", "35");
               placeMarker.content = iconEl;

               placeMarker.addListener("mouseover", () => {
                  markerInfo.open(map, placeMarker);
               });
               placeMarker.addListener("mouseout", () => {
                  markerInfo.close();
               });
               if (cb) {
                  placeMarker.addListener("click", () => {
                     cb(coordList[i]);
                     markerInfo.close();
                  });
               }

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
