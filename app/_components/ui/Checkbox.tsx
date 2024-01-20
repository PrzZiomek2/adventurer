import React from "react";

interface CheckboxProps {
   id: string;
   name: string;
   checked: boolean;
   onChange: (checked: boolean) => void;
   className?: string;
}

export const Checkbox = ({
   id,
   name,
   checked,
   onChange,
   className,
   ...props
}: CheckboxProps) => (
   <input
      {...props}
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={(e) => onChange(e.currentTarget.checked)}
      className={` ${className || ""}`}
   />
);
