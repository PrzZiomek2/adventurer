interface LabelProps {
   children: React.ReactNode;
   htmlFor: string;
   className?: string;
   variant?: "top" | "right";
}

export const Label = ({
   children,
   htmlFor,
   className,
   variant = "top",
   ...props
}: LabelProps) => {
   const classes: { [key: string]: string } = {
      top: "pb-2",
      right: "p-0",
   };

   return (
      <label
         {...props}
         htmlFor={htmlFor}
         className={`
         block text-md font-medium text-dim
         ${classes[variant]}
         ${className || ""}
      `}
      >
         {children}
      </label>
   );
};
