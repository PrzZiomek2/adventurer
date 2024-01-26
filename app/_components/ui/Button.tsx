import React, { MouseEventHandler, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "primary" | "secondary" | "icon";
   isSubmitting?: boolean;
   children: React.ReactNode;
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
      primary: "rounded-md bg-emerald-700 text-white ",
      secondary:
         " bg-transparent text-emerald-900 border-emerald-900 border",
      icon: "p-0",
   };

   return (
      <button
         {...props}
         className={`
            ${classes[variant]} 
            py-2 px-4 p-2 rounded-md w-full m-4
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            ${className || ""}
         `}
      >
         {children}
      </button>
   );
};
