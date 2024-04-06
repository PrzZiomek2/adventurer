import { RatingLabel } from "@/components/common/Rating/RatingLabel";

interface PlaceOpinionProps {
   author_name: string;
   rating: number;
   language: string;
   profile_photo_url: string;
   relative_time_description: string;
   text: string;
}

export const PlaceOpinion = ({
   author_name,
   rating,
   text,
   language,
   profile_photo_url,
   relative_time_description,
}: PlaceOpinionProps) => {
   return (
      <div className="flex gap-2 flex-col">
         <div className="">
            <img
               alt="awatar autora"
               className={`                 
                        rounded-full w-[30px] h-[30px]
                        object-cover bg-emerald-200 max-w-none
                     `}
               src={profile_photo_url}
               width={30}
               height={30}
               loading="lazy"
            />
            <span>{author_name}</span>
            <span className="text-sm">{relative_time_description}</span>
         </div>
         <div className="">
            <RatingLabel rating={rating} />
            <p className="text-sm">{text}</p>
         </div>
      </div>
   );
};
