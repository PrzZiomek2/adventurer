import React, { MouseEventHandler, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: string;
   isSubmitting?: boolean;
   children: string | React.ReactNode;
   onClick?: MouseEventHandler<HTMLButtonElement>;
   className?: string;
}

export const Button = ({
   variant = "secondary",
   isSubmitting,
   children,
   className,
   ...props
}: ButtonProps) => {
   const classes: { [key: string]: string } = {
      primary: "p-2 rounded-md bg-emerald-700 text-white py-2 px-4 w-full",
      secondary:
         "p-2 rounded-md bg-transparent text-emerald-900 py-2 px-4 w-full border-emerald-900 border",
   };

   return (
      <button
         {...props}
         className={`
            ${classes[variant]} 
            ${isSubmitting && "opacity-50 cursor-not-allowed"}
            ${className || ""}
         `}
      >
         {children}
      </button>
   );
};
