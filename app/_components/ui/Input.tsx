import R, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   id: string;
   type: string;
   placeholder?: string;
   error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
   placeholder,
   type,
   id,
   error,
   ...props
 }, ref) => {
   return (
     <input
       {...props}
       ref={ref}
       id={id}
       type={type}
       placeholder={placeholder}
       className={` 
         p-2 rounded-md bg-emerald-50 border 
         border-emerald-500 max-w-[500px] w-full 
         ${error ? 'border-red-500' : 'border-gray-300'}`
       }
     />
   );
 });

 Input.displayName = "Input";

 export {Input};