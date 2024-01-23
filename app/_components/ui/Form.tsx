import React from "react";

interface FormProps {
   onSubmit?: React.FormEventHandler<HTMLFormElement>;
   children: React.ReactNode | string;
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
      className={`w-full flex flex-col items-center max-w-md mx-auto mt-10 ${className || ""}`}
   >
      {children}
   </form>
);
