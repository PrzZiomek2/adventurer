import Select from "@/components/ui/Select";
import regions from "../../../../../../../public/data/regions.json";
import { Dispatch, FC, SetStateAction } from "react";

interface PlacesOptionsProps {
   currentRegion: string;
   setCurrentRegion: Dispatch<SetStateAction<string>>;
}

export const PlacesOptions: FC<PlacesOptionsProps> = ({
   currentRegion,
   setCurrentRegion,
}) => {
   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <Select
            options={regions}
            value={currentRegion}
            onChange={(value) => setCurrentRegion(value)}
            ariaLabel="wybierz kontynent / region"
         />
      </div>
   );
};
