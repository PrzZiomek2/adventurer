import { IoStarSharp } from "react-icons/io5";

interface RatingLabelProps {
   rating: number;
   className?: string;
}

export const RatingLabel = ({ rating, className }: RatingLabelProps) => {
   return (
      rating && (
         <div
            className={`
            flex gap-2 text-xl font-bold mr-2
            ${className}
         `}
         >
            <span className="text-darken">{rating}</span>
            <IoStarSharp className="text-2xl text-yellow-50 mb-[4px]" />
         </div>
      )
   );
};
