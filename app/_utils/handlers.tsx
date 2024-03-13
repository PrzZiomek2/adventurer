import { renderToStaticMarkup } from "react-dom/server";
import { IconType } from "react-icons";

export const iconToString = (Icon: IconType) =>
   `data:image/svg+xml;utf-8,${encodeURIComponent(
      renderToStaticMarkup(<Icon />),
   )}`;

export const getPlacesCoords = (places: MapPlace[]) =>
   places.map(({ geometry, place_id, name }) => ({
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      name,
      place_id,
   }));
