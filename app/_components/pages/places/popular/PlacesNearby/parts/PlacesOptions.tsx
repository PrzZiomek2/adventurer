import Select from "@/components/ui/Select";
import { Dispatch, FC, SetStateAction } from "react";
import { Input } from "@/components/ui/Input";

interface PlacesOptionsProps {}

export const PlacesOptions: FC<PlacesOptionsProps> = () => {
   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <Input
            className="max-w-[262px]"
            type="text"
            placeholder="Szukaj miasta"
            id="name"
         />
      </div>
   );
};
