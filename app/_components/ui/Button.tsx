import React, {
   MouseEventHandler,
   ButtonHTMLAttributes,
   forwardRef,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "primary" | "secondary" | "icon" | "tertiary" | "custom";
   isSubmitting?: boolean;
   children: React.ReactNode;
   onClick?: MouseEventHandler<HTMLButtonElement>;
   className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         variant = "secondary",
         isSubmitting,
         children,
         className,
         disabled,
         ...props
      },
      ref,
   ) => {
      const classes: { [key: string]: string } = {
         primary:
            "text-lg rounded-md bg-dark hover:bg-emerald-500 border-2 text-white border-dark focus-visible:outline-white",
         secondary: `text-lg bg-transparent text-dim border-dim border-2 border
         hover:bg-emerald-400 hover:font-semibold focus-visible:outline-white`,
         tertiary:
            "py-0 py-2 px-0 sm:py-1 my-2 w-auto text-dim hover:text-emerald-600",
         icon: "p-0 m-0 border-none hover:brightness-85 w-auto focus-visible:outline-white",
         custom: "",
      };

      return (
         <button
            {...props}
            ref={ref}
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
   },
);

Button.displayName = "Button";

export default Button;
