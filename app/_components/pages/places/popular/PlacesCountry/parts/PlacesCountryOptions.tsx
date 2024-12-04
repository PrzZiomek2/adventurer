import Select from "@/components/ui/Select";
import { Dispatch, FC, SetStateAction } from "react";
import { PlacesCountrySearch } from "./PlacesCountrySearch";

interface PlacesCountryOptionsProps {
   currentCountry: string;
   setCurrentCountry: Dispatch<SetStateAction<string>>;
}

export const PlacesCountryOptions: FC<PlacesCountryOptionsProps> = ({
   currentCountry,
   setCurrentCountry,
}) => {
   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <PlacesCountrySearch
            currentCountryName={currentCountry}
            setCurrentCountry={setCurrentCountry}
         />
      </div>
   );
};
