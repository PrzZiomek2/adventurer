import { Dispatch, FC, SetStateAction } from "react";
import { Tag } from "@/components/ui/Tag";

interface PlacesNearbyOptionsProps {
   categories: string[];
   setCategories: Dispatch<SetStateAction<string[]>>;
}

export const PlacesNearbyOptions: FC<PlacesNearbyOptionsProps> = ({
   categories,
   setCategories,
}) => {
   const handleDelete = (value: string) => {
      const newCategories = categories.filter((val) => val !== value);
      setCategories(newCategories);
   };

   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <div className="flex gap-1 overflow-x-auto with-scroll pb-2 -mt-2 lg:mt-0">
            {categories.map((tag) => (
               <Tag
                  key={tag}
                  data={tag}
                  handleDelete={handleDelete}
               />
            ))}
         </div>
      </div>
   );
};
