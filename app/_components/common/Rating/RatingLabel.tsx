import { IoStarSharp } from "react-icons/io5";

export const RatingLabel = ({ rating }: { rating: number }) => {
   return (
      rating && (
         <div className="flex gap-2 items-center text-xl font-bold mr-2">
            <span className="text-darken">{rating}</span>
            <IoStarSharp className="text-2xl text-yellow-50 mb-[4px]" />
         </div>
      )
   );
};
