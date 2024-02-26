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
   console.log({ place });

   return (
      <div className="flex flex-col md:flex-row border border-dark shadow-item rounded-lg overflow-hidden">
         <div className="mb-2 mt-4">
            {photos?.length > 0 &&
               photos.map(({ photo_reference }) => (
                  <Image
                     alt="zdjęcie miejsca"
                     key={photo_reference}
                     className="w-[300px] h-[200px] m-auto mt-15px] rounded-lg object-cover bg-emerald-200"
                     src={`
                        ${googleMaps}/place/photo?maxheight=300&maxwidth=400&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}
                     `}
                     width={250}
                     height={200}
                     onError={() => "brak zdjęcia"}
                  />
               ))}
         </div>
         <div className="flex flex-col justify-between flex-grow p-4">
            <div className="flex flex-col space-y-2">
               <div className="text-lg font-bold flex justify-between items-center">
                  <Link
                     className="text-dark hover:underline text-[22px] decoration-4"
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
            <div className="flex mt-2">
               <div className="flex gap-2 items-center text-xl font-bold mr-2">
                  <span className="text-darken">{rating}</span>
                  <IoStarSharp className="text-2xl text-yellow-50 mb-[6px]" />
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
