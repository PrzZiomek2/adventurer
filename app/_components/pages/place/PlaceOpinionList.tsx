import { Heading } from "@/components/ui/Heading";
import { PlaceOpinion } from "./parts/PlaceOpinion";
import { OpinionSkeleton } from "./parts/OpinionSkeleton";

interface PlaceDetailsProps {
   details: PlaceDetails | undefined;
}

export const PlaceOpinionList: React.FC<PlaceDetailsProps> = ({ details }) => {
   const loadingSkeletons = Array.from({ length: 4 }).map((_, i) => (
      <OpinionSkeleton key={i} />
   ));

   const opinionList = details?.reviews?.map(
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
   );

   return (
      <section className="opinion-list row-start-2 row-end-4 w-full 2md:max-w-[680px]">
         <div className="flex flex-col gap-3">
            <Heading
               variant="h3"
               className="mb-2"
            >
               Opinie
            </Heading>
            {details ? opinionList : loadingSkeletons}
         </div>
      </section>
   );
};
