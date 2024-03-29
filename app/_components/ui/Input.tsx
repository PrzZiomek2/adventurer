import R, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   id: string;
   type: string;
   placeholder?: string;
   error?: boolean;
   className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ placeholder, type, id, error, className, ...props }, ref) => {
      return (
         <input
            {...props}
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            className={` 
              p-2 rounded-md bg-emerald-50 border 
               w-full border-transparent
              ${error ? "border-red-500" : "border-gray-300"}
              ${className || ""}
            `}
         />
      );
   },
);

Input.displayName = "Input";

export { Input };
