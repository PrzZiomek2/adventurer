import React, {
   Dispatch,
   FC,
   FormEvent,
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
import { useKeyboardNavigation } from "app/_customHooks/useKeyboardNavigation";

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
   const [currentValue, setCurrentValue] = useState(
      initialCountry?.label || currentCountryName,
   );
   const [expanded, setExpanded] = useState(false);
   const [suggestions, setSuggestions] = useState<CountryMatch[]>([]);
   const searchRef = useRef<HTMLInputElement>(null);
   useClickOutside(searchRef.current, () => setExpanded(false));
   const { listRef, itemNumber, handleListNavigation } = useKeyboardNavigation(
      suggestions,
      (itemNumber: number) => {
         handleSelect(suggestions[itemNumber]);
      },
   );

   const id = "search-country";

   useEffect(() => {
      if (suggestions.length === 1 && suggestions[0].label === currentValue) {
         setExpanded(false);
      }
   }, [suggestions.length, currentValue]);

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

      if (matchCountries.length) {
         setExpanded(true);
         setSuggestions(matchCountries);
      }
   }, [currentValue]);

   const handleSelect = ({ label, value }: CountryMatch) => {
      setCurrentValue(label);
      setCurrentCountry(value);
      setExpanded(false);
   };

   const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setExpanded(false);
      const formData = new FormData(e.currentTarget);
      const inputValue = formData.get("country");
      if (inputValue && typeof inputValue === "string") {
         setCurrentCountry(inputValue);
      }
   };

   return (
      <form
         onSubmit={handleSearchSubmit}
         className="flex items-end"
         autoComplete="off"
      >
         <div className="search-input md:min-w-[300px] relative">
            <Label htmlFor={id}>Kraj</Label>
            <Input
               value={currentValue}
               type="text"
               id={id}
               name="country"
               placeholder="np. Polska"
               onChange={(e) => setCurrentValue(e.target.value)}
               className="rounded-r-none"
               ref={searchRef}
            />
            {expanded && (
               <ul
                  className={`
                        search-list
                        absolute top-full left-0 w-full border border-dark bg-white 
                        shadow-lg rounded-md z-10 -mt-[2px] rounded-t-none max-h-[400px] 
                        overflow-y-auto with-scroll
                     `}
                  tabIndex={0}
                  ref={listRef}
                  onKeyDown={handleListNavigation}
               >
                  {suggestions.map((suggestion, i) => (
                     <li
                        key={suggestion.value}
                        className={`
                        px-3 py-2 cursor-pointer
                        hover:bg-light
                        ${i === itemNumber ? "bg-light" : ""}
                     `}
                        onClick={() => handleSelect(suggestion)}
                        onKeyDown={(e) =>
                           e.key === "Enter" && handleSelect(suggestion)
                        }
                     >
                        {suggestion.label}
                     </li>
                  ))}
               </ul>
            )}
         </div>
         <Button
            type="submit"
            variant="custom"
            className={`
                  rounded-l-none bg-dark hover:bg-emerald-500 border-2 text-white
                   border-dark focus-visible:outline-white p-[10px] text-[16px] 
                   leading-[normal] m-0
               `}
         >
            Szukaj
         </Button>
      </form>
   );
};
