import { Tag } from "@/components/ui/Tag";
import { urls } from "app/_utils/urls";
import Image from "next/image";
import Link from "next/link";
import { IoStarSharp } from "react-icons/io5";

interface PlaceItemProps {
   place: MapPlace;
}

export const PlaceItem = ({ place }: PlaceItemProps) => {
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
   console.log({ place, phots: photos.length });

   return (
      <div
         className={`
            flex flex-col md:flex-row border  
            max-w-[450px] md:max-w-fit md:gap-3
            border-dark shadow-item rounded-lg 
            md:min-w-[-webkit-fill-available]
         `}
      >
         <div
            className={`
               sm:mb-2 sm:mt-4 my-0 mx-auto 
               w-[280px] h-[180px] sm:w-[300px] sm:h-[200px] md:w-[230px] md:h-full md:m-0
               rounded-lg bg-emerald-200 md:rounded-r-none 
            `}
         >
            {photos?.length > 0 &&
               photos.map(({ photo_reference }) => (
                  <Image
                     alt="zdjęcie miejsca"
                     key={photo_reference}
                     className={`
                        w-[280px] h-[180px] sm:w-[300px] sm:h-[200px] md:w-[230px] md:h-full md:m-0 md:max-w-max
                        rounded-b-none sm:rounded-b-lg rounded-lg object-cover bg-emerald-200 md:rounded-[8px_0_0_8px]
                     `}
                     src={`
                        ${googleMaps}/place/photo?maxheight=300&maxwidth=400&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}
                     `}
                     width={250}
                     height={200}
                  />
               ))}
         </div>
         <div className="flex flex-col justify-between flex-grow p-4 md:w-[70%]">
            <div className="flex flex-col space-y-2">
               <div className="text-lg font-bold flex justify-between items-baseline">
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
               {opening_hours ? (
                  <div className="text-lg">
                     {opening_hours.open_now
                        ? "Teraz otwarte"
                        : "Teraz zamknieta"}
                  </div>
               ) : null}
            </div>
            <div className="flex mt-2 items-center">
               <div className="flex gap-2 items-center text-xl font-bold mr-2">
                  <span className="text-darken">{rating}</span>
                  <IoStarSharp className="text-2xl text-yellow-50 mb-[4px]" />
               </div>
               <div className="text-lg">({user_ratings_total})</div>
               {price_level ? (
                  <div className="text-xl text-darken tracking-wider font-bold text-right flex-grow">
                     {Array.from({ length: price_level }, () => `$`).join("")}
                  </div>
               ) : null}
            </div>

            <div className="flex flex-wrap mt-2 -mx-1">
               {types.map((tag) => (
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
