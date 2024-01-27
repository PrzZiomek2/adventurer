import React from "react";

interface FormProps {
   onSubmit?: React.FormEventHandler<HTMLFormElement>;
   children: React.ReactNode;
   className?: string;
}

export const Form = ({
   children,
   className,
   onSubmit,
   ...props
}: FormProps) => (
   <form
      {...props}
      onSubmit={onSubmit}
      className={`
         w-full flex flex-col mt-6
         max-w-[600px] mx-auto
         bg-medium shadow-xl rounded pt-4 pl-6 pr-6 pb-6
         ${className || ""}
      `}
   >
      {children}
   </form>
);
