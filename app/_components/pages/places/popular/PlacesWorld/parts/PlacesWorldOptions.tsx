import Select from "@/components/ui/Select";
import regions from "../../../../../../../public/data/regions.json";
import { Dispatch, FC, SetStateAction } from "react";

interface PlacesWorldOptionsProps {
   currentRegion: string;
   setCurrentRegion: Dispatch<SetStateAction<string>>;
}

export const PlacesWorldOptions: FC<PlacesWorldOptionsProps> = ({
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
