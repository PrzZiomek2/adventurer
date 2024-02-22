import { Tag } from "@/components/ui/Tag";
import Image from "next/image";
import Link from "next/link";
import { IoStarSharp } from "react-icons/io5";

interface PlaceItemProps {
   place: MapPlace;
}

export const PlaceItem = ({ place }: PlaceItemProps) => {
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
         <div className="w-[250px] h-[200px]">
            {photos?.length > 0 &&
               false &&
               photos.map((photo) => (
                  <Image
                     alt="zdjęcie miejsca"
                     key={photo.photo_reference}
                     src={photo.photo_reference}
                     width={250}
                     height={200}
                  />
               ))}
         </div>
         <div className="flex flex-col justify-between flex-grow p-4">
            <div className="flex flex-col space-y-2">
               <div className="text-lg font-bold flex justify-between">
                  <Link
                     className="text-dark hover:underline"
                     href={`#`}
                  >
                     {name}
                  </Link>
                  {icon && (
                     <Image
                        alt="ikona typu placówki"
                        src={icon}
                        width={22}
                        height={18}
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
               <div className="flex gap-2 items-center text-lg font-bold">
                  <span>{rating}</span>
                  <IoStarSharp className="text-xl text-yellow-100" />
               </div>
               <div className="text-lg">({user_ratings_total})</div>
               {price_level ? (
                  <div className="text-lg font-bold text-right flex-grow">
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
