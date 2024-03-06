import { Tag } from "@/components/ui/Tag";
import { urls } from "app/_utils/urls";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoStarSharp } from "react-icons/io5";

interface PlaceItemProps {
   place: MapPlace;
   highlight: boolean;
}

export const PlaceItem = ({ place, highlight }: PlaceItemProps) => {
   const itemRef = useRef<HTMLDivElement>(null);
   const { googleMaps } = urls();
   const {
      formatted_address,
      name,
      photos,
      price_level,
      rating,
      user_ratings_total,
      types,
      icon,
      opening_hours,
   } = place;

   useEffect(() => {
      if (itemRef.current && highlight) {
         itemRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [itemRef.current, highlight]);

   const filteredTypes = types
      ?.filter(
         (type) => type !== "establishment" && type !== "point_of_interest",
      )
      .slice(0, 5);

   return (
      <div
         ref={itemRef}
         className={`
            flex flex-col md:flex-row border lg:max-desktop:flex-col
            md:max-w-fit md:gap-3 w-full max-w-[390px]
            border-dark rounded-lg 
            ${highlight ? "shadow-highlight" : "shadow-item-bolder"}
            md:min-w-[-webkit-fill-available] justify-self-center
         `}
      >
         <div
            className={`
               sm:mb-2 sm:mt-4 my-0 mx-auto 
               w-[264px] h-[180px] sm:w-[300px] sm:h-[200px] lg:max-h-[240px]
               md:w-[200px] md:m-0 lg:max-desktop:w-[276px] lg:max-desktop:h-[180px] desktop:h-full
                bg-emerald-200 lg:max-desktop:m-auto lg:max-desktop:mt-4 
                rounded-b-none sm:rounded-b-lg rounded-lg md:rounded-[8px_0_0_8px]
            `}
         >
            {photos?.length > 0 &&
               photos.map(({ photo_reference }) => (
                  <img
                     alt="zdjęcie miejsca"
                     key={photo_reference}
                     className={`
                        w-full h-[180px] sm:w-[300px] sm:h-[200px] 
                        md:w-[200px] md:m-0 lg:max-desktop:w-[276px] lg:max-h-[240px]
                        rounded-b-none sm:rounded-b-lg rounded-lg md:rounded-[8px_0_0_8px] 
                        object-fill bg-emerald-200 max-w-none
                     `}
                     src={`
                        ${googleMaps}/place/photo?maxwidth=300&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}
                     `}
                     width={250}
                     height={200}
                  />
               ))}
         </div>
         <div className="flex flex-col justify-between flex-grow p-4 desktop:p-3 lg:max-desktop:w-full">
            <div className="flex flex-col space-y-2">
               <div className="text-lg font-bold flex justify-between items-baseline gap-4">
                  <Link
                     className="text-dark hover:underline text-[22px] leading-[1.3] decoration-4"
                     href={`#`}
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
                     />
                  )}
               </div>
               <div className="text-lg">{formatted_address}</div>
            </div>
            <div className="flex flex-col  md:flex-row items-stretch md:items-baseline">
               <div className="flex mt-2 items-center">
                  <div className="flex gap-2 items-center text-xl font-bold mr-2">
                     <span className="text-darken">{rating}</span>
                     <IoStarSharp className="text-2xl text-yellow-50 mb-[4px]" />
                  </div>
                  <div className="text-lg">({user_ratings_total})</div>
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
               {filteredTypes.map((tag) => (
                  <Tag
                     key={tag}
                     data={tag}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};
