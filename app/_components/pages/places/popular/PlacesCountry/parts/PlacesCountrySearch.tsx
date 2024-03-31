import React, {
   Dispatch,
   FC,
   SetStateAction,
   useEffect,
   useRef,
   useState,
} from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import countries from "../../../../../../../public/data/countries.json";
import { useClickOutside } from "app/_customHooks/useClickOutside";

interface CountryMatch {
   value: string;
   label: string;
}

interface PlacesCountrysuggestionsProps {
   currentCountryName: string;
   setCurrentCountry: Dispatch<SetStateAction<string>>;
}

export const PlacesCountrySearch: FC<PlacesCountrysuggestionsProps> = ({
   currentCountryName,
   setCurrentCountry,
}) => {
   const isCountryMatch = (searchName: string, countriesName: string) =>
      countriesName.toLowerCase().includes(searchName.toLowerCase());
   const initialCountry = countries.find((country) =>
      isCountryMatch(currentCountryName, country.value),
   );
   const [country, setCountry] = useState(initialCountry);
   const [currentValue, setCurrentValue] = useState(
      initialCountry?.label || currentCountryName,
   );
   const [expanded, setExpanded] = useState(false);
   const [suggestions, setSuggestions] = useState<CountryMatch[]>([]);
   const searchRef = useRef<HTMLDivElement>(null);
   useClickOutside(searchRef.current, () => setExpanded(false));

   const id = "search-country";

   useEffect(() => {
      if (currentValue.length < 2) {
         setExpanded(false);
         return;
      }
      const matchCountries = countries.filter(
         (country) =>
            isCountryMatch(currentValue, country.value) ||
            isCountryMatch(currentValue, country.label),
      );
      console.log(matchCountries);

      if (matchCountries.length) {
         setExpanded(true);
         setSuggestions(matchCountries);
      }
   }, [currentValue]);

   const handleChange = (value: CountryMatch) => {
      setCurrentValue(value.label);
      setCountry(value);
      setExpanded(false);
   };

   return (
      <div
         className="relative mt-4 md:max-w-[300px]"
         ref={searchRef}
      >
         <div className="search-input">
            <Label htmlFor={id}>Kraj</Label>
            <Input
               value={currentValue}
               type="text"
               id={id}
               name={id}
               placeholder="np. Polska"
               onChange={(e) => setCurrentValue(e.target.value)}
            />
         </div>
         {expanded && (
            <ul
               className={`
                  search-list
                  absolute top-full left-0 w-full border border-dark bg-white 
                  shadow-lg rounded-md z-10 -mt-[2px] rounded-t-none max-h-[400px] 
                  overflow-y-auto with-scroll
               `}
               // ref={listRef}
               //onKeyDown={handleListNavigation}
            >
               {suggestions.map((suggestion, i) => (
                  <li
                     key={suggestion.value}
                     className={`
                        px-3 py-2 cursor-pointer
                        hover:bg-light
                     `}
                     onClick={() => handleChange(suggestion)}
                     onKeyDown={(e) =>
                        e.key === "Enter" && handleChange(suggestion)
                     }
                  >
                     {suggestion.label}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};
