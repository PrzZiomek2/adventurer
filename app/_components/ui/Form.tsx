import React from "react";

interface FormProps {
   onSubmit?: React.FormEventHandler<HTMLFormElement>;
   children: React.ReactNode;
   className?: string;
   maxWidth?: number;
}

export const Form = ({
   children,
   className,
   onSubmit,
   maxWidth = 600,
   ...props
}: FormProps) => (
   <form
      {...props}
      onSubmit={onSubmit}
      className={`
         w-full flex flex-col
         max-w-[${maxWidth}px] mx-auto
         bg-blend shadow-lg sm:rounded-md pt-6 mb-4 pb-6 px-4 md:px-6 md:pt-4
         ${className || ""}
      `}
   >
      {children}
   </form>
);
