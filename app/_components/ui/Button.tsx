import React, { MouseEventHandler, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "primary" | "secondary" | "icon" | "tertiary";
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
      primary:
         "rounded-md bg-dark hover:bg-emerald-500 border-2 text-white border-dark",
      secondary: `bg-transparent text-dim border-dim border-2 border
         hover:bg-emerald-400 hover:font-semibold`,
      tertiary: "pt-1 pl-0 pr-0 pb-1 mt-2 mb-2 text-dim hover:text-emerald-700",
      icon: "p-0 m-0 border-none hover:brightness-85 w-auto",
   };

   return (
      <button
         {...props}
         className={`
            ${classes[variant]} 
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
         `}
      >
         {children}
      </button>
   );
};
