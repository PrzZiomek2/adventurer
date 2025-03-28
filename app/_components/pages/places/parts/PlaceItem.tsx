import { Tag } from "@/components/ui/Tag";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getTranslatedTag } from "app/_utils/handlers";
import { urls } from "../../../../_utils/urls";
import { RatingLabel } from "@/components/common/Rating/RatingLabel";

interface PlaceItemProps {
   place: MapPlace;
   highlight: boolean;
   handlePlaceLinkClick: (name: string, id: string) => void;
}

export const PlaceItem = ({
   place,
   highlight,
   handlePlaceLinkClick,
}: PlaceItemProps) => {
   const pathname = usePathname();
   const locale = pathname.split("/")[1];
   const itemRef = useRef<HTMLDivElement>(null);
   const isPolishLocale = locale === "pl";
   const {
      formatted_address,
      name,
      photos,
      price_level,
      rating,
      user_ratings_total,
      types,
      icon,
      place_id,
      opening_hours,
   } = place;
   const { googleMaps } = urls();

   useEffect(() => {
      if (itemRef.current && highlight) {
         itemRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [itemRef.current, highlight]);

   const filteredTypes = types
      ?.filter((type) => type !== "establishment")
      .slice(0, 5);

   return (
      <div
         className={`
            relative
            flex flex-col md:flex-row border lg:max-desktop:flex-col 
            lg:max-desktop:min-w-[200px] lg:max-desktop:max-w-[400px]
            md:max-w-fit md:gap-3 w-full max-w-[390px]
            border-dark rounded-lg 
            ${highlight ? "shadow-highlight" : "shadow-item-bolder"}
            md:fill-available-width justify-self-center
            overflow-hidden shrink-0
         `}
      >
         <div
            ref={itemRef}
            className="absolute -top-[10px] left-0 w-full h-2"
         />
         <div
            className={`
               sm:mb-2 sm:mt-4 my-0 mx-auto 
               w-[360px] h-[180px] sm:w-[300px] sm:h-[200px] lg:max-h-[240px]
               md:w-[200px] md:m-0 lg:max-desktop:w-[320px] lg:max-desktop:h-[180px] desktop:h-full
                bg-emerald-200 lg:max-desktop:m-auto lg:max-desktop:mt-4 
                rounded-b-none sm:rounded-b-lg rounded-lg md:rounded-[8px_0_0_8px] shrink-0
            `}
         >
            {photos?.length > 0 &&
               photos.map(({ photo_reference }) => (
                  <Image
                     alt="zdjęcie miejsca"
                     key={photo_reference}
                     className={`
                        w-full h-[180px] sm:w-[300px] sm:h-[200px] 
                        md:w-[200px] md:m-0 lg:max-desktop:w-[320px] lg:h-[300px]
                        rounded-b-none sm:rounded-b-lg rounded-lg md:rounded-[8px_0_0_8px] 
                        object-cover bg-emerald-200 max-w-none
                     `}
                     src={`${googleMaps}/streetview?size=400x300&fov=50&heading=90&location=${formatted_address}&key=${process.env.NEXT_PUBLIC_GOOGLE_STREET_KEY}`}
                     width={400}
                     height={300}
                     style={{ maxWidth: "100%", height: "110%" }}
                     loading="eager"
                  />
               ))}
         </div>
         <div className="flex flex-col justify-between flex-grow p-4 desktop:p-3 lg:max-desktop:w-full">
            <div className="flex flex-col space-y-2">
               <div className="text-lg font-bold flex justify-between items-baseline gap-4">
                  <Link
                     className="text-dark hover:underline text-[22px] leading-[1.3] decoration-4"
                     href={`/${locale}/place/${place.place_id}`}
                     onClick={() => handlePlaceLinkClick(name, place_id)}
                  >
                     {name}
                  </Link>
                  {icon && (
                     <Image
                        alt="ikona typu placówki"
                        src={icon}
                        className="max-w-[20px] max-h-[25px]"
                        width={20}
                        height={25}
                        loading="eager"
                     />
                  )}
               </div>
               <div className="text-lg">{formatted_address}</div>
            </div>
            <div className="flex flex-col  md:flex-row items-stretch md:items-baseline">
               <div className="flex mt-2 items-center">
                  <RatingLabel
                     rating={rating}
                     className="items-center"
                  />
                  {user_ratings_total ? (
                     <div className="text-lg">({user_ratings_total})</div>
                  ) : null}
                  {price_level ? (
                     <div className="text-xl text-darken tracking-wider font-bold ml-6 text-right flex-grow">
                        {Array.from({ length: price_level }, () => `$`).join(
                           "",
                        )}
                     </div>
                  ) : null}
               </div>
               {opening_hours ? (
                  <div className="relative text-lg ml-0 md:ml-6 bottom-[1px]">
                     {opening_hours.open_now
                        ? "Teraz otwarte"
                        : "Teraz zamknieta"}
                  </div>
               ) : null}
            </div>
            <div className="flex flex-wrap -mx-1">
               {filteredTypes.map((tag) => {
                  const translatedTag = isPolishLocale
                     ? getTranslatedTag(tag, "placeTypes")
                     : tag;
                  return (
                     <Tag
                        key={tag}
                        data={translatedTag.replaceAll("_", " ")}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
};
