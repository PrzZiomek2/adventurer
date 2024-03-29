import { useClickOutside } from "app/_customHooks/useClickOutside";
import {
   FC,
   ChangeEvent,
   useState,
   useEffect,
   KeyboardEvent,
   useRef,
} from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectProps {
   options: { value: string; label: string }[];
   value: string;
   onChange: (value: string) => void;
   ariaLabel: string;
}

const Select: FC<SelectProps> = ({ options, value, onChange, ariaLabel }) => {
   const [expanded, setExpanded] = useState(false);
   const [selectedOption, setSelectedOption] = useState(
      options.find((option) => option.value === value),
   );
   const selectRef = useRef<HTMLDivElement>(null);
   const listRef = useRef<HTMLUListElement>(null);
   useClickOutside(selectRef.current, () => setExpanded(false));
   const [itemNumber, setItemNumber] = useState(-1);

   useEffect(() => {
      if (listRef.current && expanded) {
         listRef.current.tabIndex = 0;
      }
   }, [expanded]);

   const handleChange = (option: { value: string; label: string }) => {
      setSelectedOption(option);
      onChange(option.value);
      setExpanded(false);
   };

   const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
         setExpanded(!expanded);
      }
   };

   const handleListNavigation = (e: KeyboardEvent<HTMLUListElement>) => {
      e.preventDefault();
      switch (e.key) {
         case "ArrowDown":
            setItemNumber((prev) => Math.min(prev + 1, options.length - 1));
            break;
         case "ArrowUp":
            setItemNumber((prev) => Math.max(prev - 1, 0));
            break;
         case "Enter":
            if (itemNumber >= 0 && itemNumber < options.length) {
               setSelectedOption(options[itemNumber]);
               onChange(options[itemNumber].value);
            }
            break;
         default:
            break;
      }
   };

   return (
      <div
         ref={selectRef}
         tabIndex={0}
         onKeyDown={handleKeyPress}
         className="relative md:max-w-[282px]"
         aria-expanded={expanded}
         aria-label={ariaLabel}
      >
         <div
            className={`
               flex justify-between items-center
               w-full px-3 py-[10px] mt-1 tracking-wide text- bg-medium
               rounded-md border border-dark border-solid focus:outline-none 
               focus:border-3 sm:text-base cursor-pointer
            `}
            onClick={() => setExpanded(!expanded)}
         >
            {selectedOption?.label}
            <FaChevronDown
               className={`h-4 w-4 text-dim transition-transform ${
                  expanded ? "transform rotate-180" : ""
               }`}
            />
         </div>
         {expanded && (
            <ul
               className={`
                  absolute top-full left-0 w-full border border-dark bg-medium 
                  shadow-lg rounded-md z-10 -mt-[2px] rounded-t-none max-h-[400px] 
                  overflow-y-auto with-scroll
               `}
               ref={listRef}
               onKeyDown={handleListNavigation}
            >
               {options.map((option, i) => (
                  <li
                     key={option.value}
                     className={`
                        px-3 py-2 cursor-pointer
                        hover:bg-[#047857] hover:text-light
                        ${i === itemNumber ? "bg-[#047857] text-light" : ""}
                     `}
                     onClick={() => handleChange(option)}
                     onKeyDown={(e) =>
                        e.key === "Enter" && handleChange(option)
                     }
                  >
                     {option.label}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default Select;
