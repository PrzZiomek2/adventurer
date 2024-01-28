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
         w-full flex flex-col mt-0 md:mt-6
         max-w-[${maxWidth}px] mx-auto
         bg-medium shadow-xl rounded pt-8 pb-12 px-4 md:px-6 md:pt-4
         ${className || ""}
      `}
   >
      {children}
   </form>
);
