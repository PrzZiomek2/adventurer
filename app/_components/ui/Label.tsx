interface LabelProps {
   children: React.ReactNode | string;
   htmlFor: string;
   className?: string;
}

export const Label = ({
   children,
   htmlFor,
   className,
   ...props
}: LabelProps) => (
   <label
      {...props}
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className || ""}`}
   >
      {children}
   </label>
);
