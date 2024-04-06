import { Heading } from "@/components/ui/Heading";
import { IoMdOpen } from "react-icons/io";
import { PlaceOpinion } from "./parts/PlaceOpinion";

interface PlaceDetailsProps {
   details: PlaceDetails | undefined;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ details }) => {
   console.log(details);

   return (
      <section>
         {details && (
            <div>
               <Heading variant="h4">Strona internetowa</Heading>
               <a
                  target="_blank"
                  href={details?.website}
                  className="link"
               >
                  <span>{details?.website}</span>
                  <IoMdOpen />
               </a>
            </div>
         )}
         <div>
            {details?.reviews?.map(
               (
                  {
                     author_name,
                     language,
                     profile_photo_url,
                     rating,
                     relative_time_description,
                     text,
                  },
                  i,
               ) => (
                  <PlaceOpinion
                     key={i}
                     language={language}
                     author_name={author_name}
                     profile_photo_url={profile_photo_url}
                     rating={rating}
                     relative_time_description={relative_time_description}
                     text={text}
                  />
               ),
            )}
         </div>
      </section>
   );
};
