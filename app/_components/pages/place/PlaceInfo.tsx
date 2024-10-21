import { Heading } from "@/components/ui/Heading";
import { IoMdOpen } from "react-icons/io";

interface PlaceDetailsProps {
   details: PlaceDetails | undefined;
}

export const PlaceInfo: React.FC<PlaceDetailsProps> = ({ details }) => {
   return (
      <section className="">
         {details && (
            <div className="mb-6">
               <Heading
                  variant="h3"
                  className="mb-2"
               >
                  Informacje
               </Heading>
               <div className="flex flex-col gap-[2px]">
                  <span className="font-[600]">Strona internetowa</span>
                  <a
                     target="_blank"
                     href={details?.website}
                     className="link flex gap-1 items-center"
                  >
                     <span>{details?.website}</span>
                     <IoMdOpen />
                  </a>
               </div>
            </div>
         )}
      </section>
   );
};
