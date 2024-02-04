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
         max-w-[${maxWidth}px] card
         ${className || ""}
      `}
   >
      {children}
   </form>
);
