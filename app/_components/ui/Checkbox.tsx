import React from "react";
import { FaCheck } from "react-icons/fa6";

interface CheckboxProps {
   id: string;
   name: string;
   checked: boolean;
   onChange: (checked: boolean) => void;
   className?: string;
}

export const Checkbox = ({
   id,
   name,
   checked,
   onChange,
   className,
   ...props
}: CheckboxProps) => (
   <>
      <input
         {...props}
         type="checkbox"
         id={id}
         name={name}
         checked={checked}
         onChange={(e) => onChange(e.currentTarget.checked)}
         className={`
         appearance-none w-5 h-5 rounded-sm2 relative peer shrink-0 bg-white
         checked:bg-dark checked:border-0 disabled:bg-steel-400
         ${className || ""}
      `}
      />
      <FaCheck
         style={{ color: `white` }}
         className={`
         absolute w-5 h-5 text-white hidden peer-checked:block
        scale-75 pointer-events-none
      `}
      />
   </>
);
