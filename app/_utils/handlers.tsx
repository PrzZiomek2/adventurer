import { renderToStaticMarkup } from "react-dom/server";
import { IconType } from "react-icons";
import translations from "../../public/translations/tags.json";

export const iconToString = (Icon: IconType): string =>
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

export const getTranslatedTag = (tag: string, key: string): string => {
   const translatedTag = (translations as Record<string, any>)[key].find(
      (translation: Record<string, string>) => translation[tag],
   );
   return translatedTag?.[tag] || tag;
};
