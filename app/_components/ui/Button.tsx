import React, { MouseEventHandler, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "primary" | "secondary" | "icon" | "tertiary" | "custom";
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
   disabled,
   ...props
}: ButtonProps) => {
   const classes: { [key: string]: string } = {
      primary:
         "text-[22px] rounded-md bg-dark hover:bg-emerald-500 border-2 text-white border-dark",
      secondary: `text-[22px] bg-transparent text-dim border-dim border-2 border
         hover:bg-emerald-400 hover:font-semibold`,
      tertiary:
         "py-0 py-2 px-2 sm:py-1 my-2 w-auto text-dim hover:text-emerald-600",
      icon: "p-0 m-0 border-none hover:brightness-85 w-auto",
      custom: "",
   };

   return (
      <button
         {...props}
         disabled={disabled || isSubmitting}
         className={`
            ${classes[variant]} 
            ${className}
            ${disabled || isSubmitting ? "disabled-button" : ""}
         `}
      >
         {children}
      </button>
   );
};
