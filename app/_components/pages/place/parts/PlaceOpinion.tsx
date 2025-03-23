import { RatingLabel } from "@/components/common/Rating/RatingLabel";
import Button from "@/components/ui/Button";
import { useState } from "react";

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
   const [truncNumber, setTruncNumber] = useState(200);
   const isTextLonger = text.length > truncNumber;

   return (
      <div
         className={`
            flex gap-2 flex-col
            border md:gap-3 w-full p-3
            border-dark rounded-lg shadow-item-bolder
         `}
      >
         <div className="flex gap-3 items-center">
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
            <span className="text-sm grow text-right">
               {relative_time_description}
            </span>
         </div>
         <div className="flex gap-3">
            <RatingLabel
               rating={rating}
               className="items-top -mr-[2px]"
            />
            <p className="text-sm">
               {text.substring(0, truncNumber)}
               {isTextLonger && " ... "}
               <Button
                  variant="custom"
                  className="font-[600] py-0 px-2 text-sm m-0 hover:text-emerald-700 w-max"
                  onClick={() =>
                     isTextLonger
                        ? setTruncNumber(text.length)
                        : setTruncNumber(200)
                  }
               >
                  {isTextLonger ? "Rozwiń" : "Zwiń"}
               </Button>
            </p>
         </div>
      </div>
   );
};
