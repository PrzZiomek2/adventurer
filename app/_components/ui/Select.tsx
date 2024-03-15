import { FC, ChangeEvent } from "react";

interface SelectProps {
   options: { value: string; label: string }[];
   value: string;
   onChange: (value: string) => void;
   ariaLabel: string;
}

const Select: FC<SelectProps> = ({ options, value, onChange, ariaLabel }) => {
   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
   };

   return (
      <select
         value={value}
         onChange={handleChange}
         className={`
            appearance-none block w-full px-4 py-2 mt-1 tracking-wide text- bg-medium
            rounded-md shadow-sm focus:outline-none focus:border-darken sm:text-sm
        `}
         aria-label={ariaLabel}
      >
         {options.map((option) => (
            <option
               key={option.value}
               value={option.value}
            >
               {option.label}
            </option>
         ))}
      </select>
   );
};

export default Select;
