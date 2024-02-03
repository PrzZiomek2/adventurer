import { useState } from "react";

interface TooltipProps {
   text: string;
   children: React.ReactNode;
   isActive: boolean;
   top?: string;
   right?: string;
}

export const Tooltip = ({
   isActive,
   top = "-top-[20%]",
   right = "-right-[80%]",
   children,
   text,
}: TooltipProps) => {
   const [show, setShow] = useState(false);

   if (!isActive) return <>{children}</>;

   return (
      <div className="w-max relative">
         {show && (
            <div
               className={`
                  ${top} ${right} 
                  absolute bg-white text-dim p-3 font-medium rounded-2xl text-sm w-max h-auto max-w-64
               `}
            >
               {text}
               <span className="absolute top-[calc(100%-10px)] left-1/2 transform -translate-x-1/2 bg-white w-3 h-3 rotate-45" />
            </div>
         )}
         <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
         >
            {children}
         </div>
      </div>
   );
};
