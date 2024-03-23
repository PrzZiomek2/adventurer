import Select from "@/components/ui/Select";
import { Dispatch, FC, SetStateAction } from "react";

interface PlacesCountryOptionsProps {
   currentCountry: string;
   setCurrentCountry: Dispatch<SetStateAction<string>>;
}

export const PlacesCountryOptions: FC<PlacesCountryOptionsProps> = ({
   currentCountry,
   setCurrentCountry,
}) => {
   const options = [{ value: "Poland", label: "Polska" }];

   return (
      <div className="lg:col-start-1 lg:col-end-3 lg:mb-2">
         <Select
            options={options}
            value={currentCountry}
            onChange={(value) => setCurrentCountry(value)}
            ariaLabel="wybierz kraj"
         />
      </div>
   );
};
