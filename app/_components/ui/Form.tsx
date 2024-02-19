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
         w-full flex flex-col card
         ${className || ""}
      `}
   >
      {children}
   </form>
);
