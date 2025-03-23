import Select from "@/components/ui/Select";
import regions from "../../../../../../../public/data/regions.json";
import { Dispatch, FC, SetStateAction } from "react";
import { usePathname } from "next/navigation";

interface PlacesWorldOptionsProps {
   currentRegion: string;
   setCurrentRegion: Dispatch<SetStateAction<string>>;
}

export const PlacesWorldOptions: FC<PlacesWorldOptionsProps> = ({
   currentRegion,
   setCurrentRegion,
}) => {
   const pathname = usePathname();
   const locale = pathname.split("/")[1];
   let currentRegions = regions;

   if (locale === "en") {
      currentRegions = regions.map((region) => ({
         ...region,
         label: region.value,
      }));
   }

   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <Select
            options={currentRegions.sort((a, b) =>
               a.label.localeCompare(b.label),
            )}
            value={currentRegion}
            onChange={(value) => setCurrentRegion(value)}
            ariaLabel="wybierz kontynent / region"
         />
      </div>
   );
};
